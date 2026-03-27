import type { ReactNode } from "react";

type Props = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function MarketingArticle({ title, subtitle, children }: Props) {
  return (
    <main className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-3xl min-w-0 px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8">
        <header className="mb-8 sm:mb-10">
          <h1 className="text-balance text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-3 text-base leading-relaxed text-slate-600 sm:mt-4 sm:text-lg">{subtitle}</p>
          ) : null}
        </header>
        <div className="space-y-5 break-words text-[1.0625rem] leading-relaxed text-slate-700 sm:space-y-6">
          {children}
        </div>
      </div>
    </main>
  );
}
