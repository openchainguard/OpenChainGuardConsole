import { pillars } from "./landing-content";

export function LandingCapabilities() {
  return (
    <section id="product" className="relative z-10 scroll-mt-24 px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Capabilities operators rely on</h2>
          <p className="mt-3 text-slate-600">
            Everything you need to supervise agents—policy, auditability, and controls that teams can trust.
          </p>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-primary ring-1 ring-blue-100">
                <p.icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="text-base font-semibold text-slate-900">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
