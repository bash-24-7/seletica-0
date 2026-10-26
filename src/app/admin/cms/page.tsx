"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Save, X } from "lucide-react";

export default function CMSPage() {
  const [content, setContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/admin/content');
      const data = await res.json();
      if (res.ok) {
        setContent(data.content);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setEditForm(item);
  };

  const handleSave = async () => {
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });
      if (res.ok) {
        setEditingId(null);
        fetchContent();
      } else {
        alert("Failed to save content");
      }
    } catch (e) {
      alert("Error saving content");
    }
  };

  return (
    <div className="flex flex-col gap-12 text-brand-black">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="font-serif text-4xl mb-2">CMS & Content</h1>
          <p className="text-brand-black/60 font-light">Manage brand story, vision, and pages content.</p>
        </div>
        <button className="bg-brand-black text-brand-white px-6 py-3 text-xs tracking-widest uppercase hover:bg-brand-black/90 transition-colors flex items-center gap-2">
          <Plus size={16} /> New Block
        </button>
      </header>

      <div className="bg-brand-white border border-black/10">
        <table className="w-full text-left text-sm font-light">
          <thead className="border-b border-black/10 text-brand-black/60 uppercase tracking-widest text-xs bg-brand-black/5">
            <tr>
              <th className="px-6 py-4 font-normal">Section Key</th>
              <th className="px-6 py-4 font-normal">Title</th>
              <th className="px-6 py-4 font-normal">Status</th>
              <th className="px-6 py-4 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="p-8 text-center text-brand-black/50">Loading content...</td></tr>
            ) : content.length === 0 ? (
              <tr><td colSpan={4} className="p-8 text-center text-brand-black/50">No content found.</td></tr>
            ) : (
              content.map((item) => (
                <tr key={item.id} className="border-b border-black/5 hover:bg-brand-black/5 transition-colors">
                  {editingId === item.id ? (
                    <td colSpan={4} className="p-6">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <input className="border border-black/20 p-2 text-sm bg-transparent" placeholder="Key" value={editForm.key} onChange={e => setEditForm({...editForm, key: e.target.value})} />
                        <input className="border border-black/20 p-2 text-sm bg-transparent" placeholder="Title" value={editForm.title || ''} onChange={e => setEditForm({...editForm, title: e.target.value})} />
                        <input className="border border-black/20 p-2 text-sm bg-transparent" placeholder="Subtitle" value={editForm.subtitle || ''} onChange={e => setEditForm({...editForm, subtitle: e.target.value})} />
                        <input className="border border-black/20 p-2 text-sm bg-transparent" placeholder="Image URL" value={editForm.image || ''} onChange={e => setEditForm({...editForm, image: e.target.value})} />
                      </div>
                      <textarea className="w-full border border-black/20 p-2 text-sm bg-transparent mb-4" rows={4} placeholder="Content" value={editForm.content || ''} onChange={e => setEditForm({...editForm, content: e.target.value})} />
                      <div className="flex justify-end gap-4">
                        <button onClick={() => setEditingId(null)} className="px-4 py-2 border border-black/20 text-xs tracking-widest uppercase hover:bg-black/5 flex items-center gap-2"><X size={14} /> Cancel</button>
                        <button onClick={handleSave} className="px-4 py-2 bg-brand-black text-brand-white text-xs tracking-widest uppercase hover:bg-brand-black/90 flex items-center gap-2"><Save size={14} /> Save</button>
                      </div>
                    </td>
                  ) : (
                    <>
                      <td className="px-6 py-4 font-mono text-xs">{item.key}</td>
                      <td className="px-6 py-4">{item.title}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-[10px] uppercase tracking-widest ${item.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {item.isActive ? 'Active' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right flex justify-end gap-4">
                        <button onClick={() => handleEdit(item)} className="text-brand-black/60 hover:text-brand-black transition-colors flex items-center gap-1">
                          <Edit2 size={14} /> Edit
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
