import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { resourceItems } from "./landing-content";

export function LandingResourcesSection() {
  return (
    <section id="resources" className="relative z-10 scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Resources</h2>
            <p className="mt-2 max-w-xl text-slate-600">Deep dives to align your team before you wire production agents.</p>
          </div>
          <Link to="/console" className="text-sm font-medium text-primary hover:underline">
            Go to console →
          </Link>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {resourceItems.map((r) => (
            <a
              key={r.title}
              href={r.href}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-blue-200 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold text-slate-900 group-hover:text-primary">{r.title}</h3>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
              </div>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{r.desc}</p>
              <span className="mt-4 text-xs font-medium text-primary">Read more</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
