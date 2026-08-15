export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-blue-400/40 bg-gradient-to-br from-blue-500 via-cyan-400 to-violet-500 shadow-glow">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.7),transparent_55%)]" />
        <span className="relative text-lg font-black tracking-tight text-white">A&M</span>
      </div>
      <div>
        <div className="text-base font-extrabold tracking-tight text-white">FutureTech</div>
        <div className="text-[10px] uppercase tracking-[0.22em] text-slate-300">Solution Pvt Ltd</div>
      </div>
    </div>
  );
}
