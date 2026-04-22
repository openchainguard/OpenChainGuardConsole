import { ListTree } from "lucide-react";
import { cn } from "@/lib/utils";

export type TocItem = { id: string; label: string };

type Props = {
  items: readonly TocItem[];
};

export function DocsToc({ items }: Props) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="On this page" className="sticky top-24">
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        <ListTree className="h-3.5 w-3.5" aria-hidden />
        On this page
      </div>
      <ul className="mt-3 space-y-1 border-l border-slate-200 pl-3">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "block py-1 text-sm text-slate-600 transition-colors hover:text-slate-900",
                "border-l-2 border-transparent -ml-[13px] pl-[11px]",
                "hover:border-slate-300",
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
