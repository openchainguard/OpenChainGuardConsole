import { LandingCapabilities } from "@/components/landing/LandingCapabilities";
import { LandingDevelopersSection } from "@/components/landing/LandingDevelopersSection";
import { LandingFlagshipMetric } from "@/components/landing/LandingFlagshipMetric";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingPlatformIntro } from "@/components/landing/LandingPlatformIntro";
import { LandingProtocolSection } from "@/components/landing/LandingProtocolSection";
import { LandingResourcesSection } from "@/components/landing/LandingResourcesSection";
import { LandingSearchCommand } from "@/components/landing/LandingSearchCommand";
import { LandingStandardsStrip } from "@/components/landing/LandingStandardsStrip";
import { LandingStatsGrid } from "@/components/landing/LandingStatsGrid";
import { useLandingSearch } from "@/components/landing/useLandingSearch";

export default function LandingPage() {
  const { searchOpen, setSearchOpen, navigate } = useLandingSearch();

  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden bg-white text-slate-900 antialiased selection:bg-blue-100">
      <LandingSearchCommand open={searchOpen} onOpenChange={setSearchOpen} navigate={navigate} />
      <LandingHeader onOpenSearch={() => setSearchOpen(true)} />
      <LandingHero />

      <main className="relative bg-white">
        <LandingStandardsStrip />
        <LandingFlagshipMetric />
        <LandingStatsGrid />
        <LandingPlatformIntro />
        <LandingCapabilities />
        <LandingProtocolSection />
        <LandingResourcesSection />
        <LandingDevelopersSection />
      </main>

      <LandingFooter />
    </div>
  );
}
