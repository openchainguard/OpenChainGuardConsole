import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LandingHero() {
  return (
    <div className="relative overflow-hidden border-b border-slate-200/90 bg-slate-50 text-slate-900">
      <section className="relative px-4 pb-12 pt-8 sm:px-6 sm:pb-14 sm:pt-10 lg:px-8 lg:pb-16 lg:pt-12">
        <div className="mx-auto max-w-7xl min-w-0">
          <div className="relative max-w-xl">
            <h1 className="text-balance mt-10 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.035em] text-slate-900 sm:text-4xl lg:text-[2.85rem]">
              unlock governed agent operations at scale
            </h1>

            <p className="mt-8 max-w-xl text-pretty text-[1.0625rem] leading-[1.75] text-slate-600 sm:text-lg">
              <span className="block">
                Unify policy, identity, and human review with ERC-4337, ERC-8004, and multisig approvals.
              </span>
              <span className="mt-1 block">
                Built so agents interoperate safely across chains and legacy workflows.
              </span>
            </p>

            <div className="mt-8 flex flex-col gap-6 sm:mt-10">
            
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <Button
                  size="lg"
                  className="h-[3.25rem] gap-2 rounded-full px-9 text-base font-semibold shadow-lg shadow-blue-500/25"
                  asChild
                >
                  <Link to="/console">
                    Open the console
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-[3.25rem] rounded-full border-slate-300 bg-white px-9 text-base font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
                  asChild
                >
                  <a href="#platform">Explore the platform</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
