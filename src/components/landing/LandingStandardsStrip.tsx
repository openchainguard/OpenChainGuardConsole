import { trustLabels } from "./landing-content";

export function LandingStandardsStrip() {
  return (
    <section className="border-b border-slate-200 bg-slate-50/80 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-center text-[11px] font-semibold uppercase tracking-widest text-slate-500">
          Built for standards you already use
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {trustLabels.map((label) => (
            <span
              key={label}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 shadow-sm"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
