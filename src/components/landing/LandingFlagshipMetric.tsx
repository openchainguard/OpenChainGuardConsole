import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export function LandingFlagshipMetric() {
  return (
    <section className="relative z-10 border-y border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-500">Protocol footprint (demo)</p>
        <p className="mt-2 text-center text-3xl font-semibold tabular-nums tracking-tight text-primary sm:text-5xl md:text-6xl">
          $12,400,000,000
        </p>
        <p className="mt-2 text-center text-sm font-medium text-slate-700">notional value supervised by governed agents</p>
        <p className="mt-1 text-center text-xs text-slate-500">
          Updated {new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
        </p>
        <div className="mt-6 flex justify-center">
          <Link to="/stats" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
            View protocol metrics
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
