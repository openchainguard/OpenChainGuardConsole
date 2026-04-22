import { NavLink } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { docsNav } from "@/lib/docsNav";
import { cn } from "@/lib/utils";

export function DocsSidebar() {
  return (
    <nav aria-label="Documentation" className="flex flex-col gap-6">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 lg:hidden">
        <BookOpen className="h-4 w-4 text-primary" aria-hidden />
        Browse
      </div>
      <div className="flex flex-row gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] lg:flex-col lg:gap-6 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden">
        {docsNav.map((group) => (
          <div key={group.section} className="min-w-[10.5rem] shrink-0 lg:min-w-0">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">{group.section}</p>
            <ul className="flex flex-col gap-0.5">
              {group.items.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      cn(
                        "block rounded-lg px-3 py-2 text-sm transition-colors",
                        isActive
                          ? "bg-primary/10 font-medium text-primary"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
