export default function AdminOverview() {
  return (
    <div className="flex flex-col gap-12">
      <header>
        <h1 className="font-serif text-4xl mb-2">Overview</h1>
        <p className="text-brand-ash font-light">Welcome back. Here is the current status of Seletica.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border border-white/10 p-6 flex flex-col gap-2">
          <span className="text-brand-ash text-xs uppercase tracking-widest">Total Revenue</span>
          <span className="font-serif text-3xl">৳1,450,000</span>
        </div>
        <div className="border border-white/10 p-6 flex flex-col gap-2">
          <span className="text-brand-ash text-xs uppercase tracking-widest">Active Orders</span>
          <span className="font-serif text-3xl">12</span>
        </div>
        <div className="border border-white/10 p-6 flex flex-col gap-2">
          <span className="text-brand-ash text-xs uppercase tracking-widest">Pieces Remaining</span>
          <span className="font-serif text-3xl">84</span>
        </div>
      </div>
      
      <div className="border border-white/10 p-6">
         <h2 className="font-serif text-2xl mb-6">Recent Activity</h2>
         <p className="text-brand-ash text-sm">Real-time metrics will populate here upon receiving live traffic.</p>
      </div>
    </div>
  );
}