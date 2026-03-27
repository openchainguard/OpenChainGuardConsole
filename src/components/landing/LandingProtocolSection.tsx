import { PROTOCOL_DIAGRAM_IMAGE, steps } from "./landing-content";

export function LandingProtocolSection() {
  return (
    <section
      id="protocol"
      className="relative z-10 scroll-mt-24 overflow-x-hidden border-t border-white/[0.08] bg-[#0e0e10] py-12 text-slate-100 selection:bg-sky-500/25 sm:py-14 lg:py-16"
    >
      <div className="mx-auto max-w-7xl min-w-0 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10 lg:items-start">
          <div className="min-w-0">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">How the protocol fits together</h2>
            <p className="mt-3 text-[1.0625rem] leading-relaxed text-slate-400 sm:text-lg">
              Controllers enforce rules. Policy modules encode limits. Gatekeepers and registries give you identity and
              reputation signals—so decisions are explainable and replayable.
            </p>
            <ul className="mt-6 space-y-3.5">
              {steps.map((step) => (
                <li key={step.n} className="flex gap-4">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-white/[0.12] bg-white/[0.04] font-mono text-xs font-medium text-sky-400">
                    {step.n}
                  </span>
                  <div>
                    <div className="font-medium text-slate-100">{step.title}</div>
                    <p className="mt-1 text-sm leading-relaxed text-slate-400">{step.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0">
            <img
              src={PROTOCOL_DIAGRAM_IMAGE}
              alt="Isometric view of platform infrastructure: policy, controllers, and on-chain modules"
              className="mx-auto h-auto w-full max-h-[min(28rem,52vh)] object-contain object-center sm:max-h-[min(34rem,58vh)] lg:max-h-[min(38rem,62vh)]"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
