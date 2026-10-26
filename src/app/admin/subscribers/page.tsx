import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function SubscribersPage() {
  let subscribers: any[] = [];
  let error = null;

  try {
    subscribers = await prisma.subscriber.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (e: any) {
    error = e.message;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif mb-2">Newsletter Subscribers</h1>
        <p className="text-brand-ash">View all customers who have joined the Inner Circle.</p>
      </div>

      <div className="bg-zinc-900 border border-white/10 rounded-lg overflow-hidden">
        {error ? (
          <div className="p-8 text-center text-red-400">
            Failed to load subscribers. Database connection error.
          </div>
        ) : subscribers.length === 0 ? (
          <div className="p-8 text-center text-brand-ash">
            No subscribers yet.
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-zinc-950 border-b border-white/10">
              <tr>
                <th className="p-4 font-medium tracking-wider text-sm uppercase text-brand-ash">Email</th>
                <th className="p-4 font-medium tracking-wider text-sm uppercase text-brand-ash text-right">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {subscribers.map((sub: any) => (
                <tr key={sub.id} className="hover:bg-zinc-800/50 transition-colors">
                  <td className="p-4">{sub.email}</td>
                  <td className="p-4 text-right text-brand-ash">
                    {new Date(sub.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
