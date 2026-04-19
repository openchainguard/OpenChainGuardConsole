import type { ReactNode } from "react";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingSearchCommand } from "@/components/landing/LandingSearchCommand";
import { useLandingSearch } from "@/components/landing/useLandingSearch";

type Props = {
  children: ReactNode;
};

export function MarketingLayout({ children }: Props) {
  const { searchOpen, setSearchOpen, navigate } = useLandingSearch();

  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden bg-white text-slate-900 antialiased selection:bg-blue-100">
      <LandingSearchCommand open={searchOpen} onOpenChange={setSearchOpen} navigate={navigate} />
      <LandingHeader onOpenSearch={() => setSearchOpen(true)} />
      {children}
      <LandingFooter />
    </div>
  );
}
