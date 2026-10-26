"use client";

import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 lg:px-12 max-w-screen-xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center text-center mb-16"
      >
        <h1 className="font-serif text-4xl lg:text-5xl mb-6">Contact Us</h1>
        <p className="font-sans text-brand-ash max-w-xl text-center leading-relaxed">
          For private client inquiries, style advice, or order support, our dedicated concierge team is at your service.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="font-serif text-2xl mb-8">Send an Inquiry</h2>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-xs tracking-widest uppercase text-brand-ash">Name</label>
              <input 
                type="text" 
                id="name" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="bg-transparent border-b border-brand-black/20 py-2 focus:outline-none focus:border-brand-black transition-colors" 
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-xs tracking-widest uppercase text-brand-ash">Email</label>
              <input 
                type="email" 
                id="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="bg-transparent border-b border-brand-black/20 py-2 focus:outline-none focus:border-brand-black transition-colors" 
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="subject" className="text-xs tracking-widest uppercase text-brand-ash">Subject</label>
              <select 
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="bg-brand-white text-brand-black border-b border-brand-black/20 py-2 focus:outline-none focus:border-brand-black transition-colors appearance-none rounded-none"
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Order Support">Order Support</option>
                <option value="Private Client Services">Private Client Services</option>
                <option value="Press">Press</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-xs tracking-widest uppercase text-brand-ash">Message</label>
              <textarea 
                id="message" 
                rows={5} 
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="bg-transparent border-b border-brand-black/20 py-2 focus:outline-none focus:border-brand-black transition-colors resize-none"
              ></textarea>
            </div>
            
            {status === 'success' && (
              <p className="text-sm text-green-400">Your inquiry has been received. Our concierge will contact you shortly.</p>
            )}
            {status === 'error' && (
              <p className="text-sm text-red-400">Failed to send message. Please try again later.</p>
            )}

            <button 
              type="submit"
              disabled={status === 'loading'}
              className="bg-brand-black text-brand-white py-4 text-xs tracking-widest uppercase hover:bg-brand-black/90 transition-colors mt-4 disabled:opacity-50"
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </motion.div>

        {/* Contact Information & Socials */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col gap-12"
        >
          <div>
            <h2 className="font-serif text-2xl mb-8">Client Services</h2>
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <Mail className="text-brand-ash mt-1" size={20} />
                <div>
                  <p className="text-sm font-medium mb-1">Email</p>
                  <a href="mailto:seletica.official@gmail.com" className="text-brand-ash hover:text-brand-black transition-colors">seletica.official@gmail.com</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="text-brand-ash mt-1" size={20} />
                <div>
                  <p className="text-sm font-medium mb-1">Headquarters</p>
                  <p className="text-brand-ash leading-relaxed">Gulshan Avenue<br />Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-serif text-2xl mb-8">Follow Us</h2>
            <div className="flex flex-col gap-4">
              <a 
                href="https://www.instagram.com/seletica.official" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-brand-ash hover:text-brand-black transition-colors"
              >
                <FaInstagram size={20} />
                <span className="text-sm tracking-wide">@seletica.official</span>
              </a>
              <a 
                href="https://www.facebook.com/seletica" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-brand-ash hover:text-brand-black transition-colors"
              >
                <FaFacebookF size={20} />
                <span className="text-sm tracking-wide">SELETICA</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
