import { Link } from "react-router-dom";
import { ArrowRight, Menu, Search, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const primaryNav = [
  { to: "/platform", label: "Platform" },
  { to: "/solutions", label: "Solutions" },
  { to: "/developers", label: "Developers" },
  { to: "/resources", label: "Resources" },
  { to: "/docs", label: "Docs" },
] as const;

type Props = {
  onOpenSearch: () => void;
};

export function LandingHeader({ onOpenSearch }: Props) {
  return (
    <header className="relative z-20 border-b border-slate-200/90 bg-white/95 backdrop-blur-md">
      <div className="relative mx-auto flex h-[3.75rem] max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Link to="/" className="relative z-10 flex min-w-0 shrink-0 items-center gap-2 sm:gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md shadow-blue-500/15">
              <Shield className="h-5 w-5" aria-hidden />
            </span>
            <span className="truncate text-sm font-semibold tracking-tight text-slate-900">OpenChainGuard</span>
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 lg:hidden"
              >
                <Menu className="h-5 w-5" strokeWidth={2} />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="flex w-[min(100vw-1rem,20rem)] flex-col gap-0 pr-0 sm:max-w-sm">
              <SheetHeader className="border-b border-slate-200 pb-4 text-left">
                <SheetTitle className="text-base font-semibold text-slate-900">Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 py-4" aria-label="Mobile primary">
                {primaryNav.map((item) => (
                  <SheetClose asChild key={item.to}>
                    <Link
                      to={item.to}
                      className="rounded-lg px-3 py-3 text-[15px] font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Link
                    to="/agents"
                    className="rounded-lg px-3 py-3 text-[15px] font-medium text-primary transition-colors hover:bg-slate-100"
                  >
                    Open console
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <nav
          className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-7 xl:gap-9 lg:flex"
          aria-label="Primary"
        >
          {primaryNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-[13px] font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="relative z-10 ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
          <button
            type="button"
            aria-label="Search"
            aria-keyshortcuts="Control+K"
            onClick={onOpenSearch}
            className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <Search className="h-[18px] w-[18px]" strokeWidth={2} />
          </button>
          <Button size="sm" className="hidden gap-1.5 rounded-full px-5 shadow-md shadow-blue-500/15 sm:inline-flex" asChild>
            <Link to="/agents">
              Start building
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
          <Button size="sm" className="rounded-full px-4 sm:hidden" asChild>
            <Link to="/agents">Start</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
