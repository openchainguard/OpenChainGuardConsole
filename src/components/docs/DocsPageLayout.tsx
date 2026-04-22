import type { ReactNode } from "react";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { DocsToc, type TocItem } from "@/components/docs/DocsToc";

type Props = {
  title: string;
  description?: string;
  /** Right-rail anchors (visible from `xl` up) */
  toc?: readonly TocItem[];
  children: ReactNode;
};

export function DocsPageLayout({ title, description, toc = [], children }: Props) {
  const showToc = toc.length > 0;

  return (
    <div className="min-w-0 border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10 xl:gap-12">
          <aside className="shrink-0 border-b border-slate-200 pb-6 lg:w-56 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8 lg:sticky lg:top-24">
            <DocsSidebar />
          </aside>

          <div className="min-w-0 flex-1">
            <header className="mb-8 max-w-3xl">
              <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-900">{title}</h1>
              {description ? (
                <p className="mt-3 text-lg leading-relaxed text-slate-600">{description}</p>
              ) : null}
            </header>
            <div className="max-w-3xl space-y-6 text-[1.0625rem] leading-relaxed text-slate-700 [&_code]:rounded [&_code]:bg-slate-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.9em] [&_pre]:rounded-xl [&_pre]:bg-slate-950 [&_pre]:p-4 [&_pre]:text-[0.8125rem] [&_pre]:leading-relaxed [&_pre]:text-slate-100">
              {children}
            </div>
          </div>

          {showToc ? (
            <aside className="hidden w-44 shrink-0 xl:block xl:sticky xl:top-24">
              <DocsToc items={toc} />
            </aside>
          ) : null}
        </div>
      </div>
    </div>
  );
}
