import { Link } from "react-router-dom";
import { ArrowRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LandingDevelopersSection() {
  return (
    <section id="developers" className="relative z-10 scroll-mt-24 px-4 pb-20 sm:px-6 lg:px-8 lg:pb-24">
      <div className="mx-auto max-w-7xl rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-blue-50/80 px-6 py-12 shadow-sm sm:px-12 sm:py-14">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Developers: integrate once, govern everywhere</h2>
            <p className="mt-3 text-slate-600">
              Ship an SDK-first integration, then let operators manage limits and approvals from the console—no redeploy
              for every policy tweak.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button size="lg" className="h-12 gap-2 rounded-full px-8" asChild>
              <Link to="/console">
                Get started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-slate-200 bg-white px-8 text-slate-900 hover:bg-slate-50"
              asChild
            >
              <a href="https://github.com" target="_blank" rel="noreferrer noopener" className="gap-2">
                <Github className="h-4 w-4" />
                View on GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
