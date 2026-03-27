import { stats } from "./landing-content";

export function LandingStatsGrid() {
  return (
    <section className="relative z-10 border-b border-slate-200 bg-slate-200">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white px-4 py-8 sm:px-8">
            <div className="text-2xl font-semibold tabular-nums text-slate-900 sm:text-3xl">{s.value}</div>
            <div className="mt-1 text-xs font-medium text-slate-600">{s.label}</div>
            <div className="mt-0.5 text-[11px] text-slate-500">{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
