import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Shield, Github, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const footerNav = [
  {
    title: "Product",
    links: [
      { label: "Console", to: "/console" },
      { label: "Policy editor", to: "/policy" },
      { label: "Approval queue", to: "/approvals" },
      { label: "Audit log", to: "/audit" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Documentation", to: "/docs" },
      { label: "Protocol overview", to: "/protocol-overview" },
      { label: "GitHub", href: "https://github.com", external: true },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Protocol stats", to: "/stats" },
      { label: "Agent leaderboard", to: "/leaderboard" },
      { label: "Profile & settings", to: "/profile" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Contact", to: "/contact" },
      { label: "Privacy", to: "/privacy" },
      { label: "Terms", to: "/terms" },
    ],
  },
] as const;

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-900"
    >
      {children}
    </a>
  );
}

export function LandingFooter() {
  return (
    <footer className="relative z-10 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl min-w-0 px-4 py-12 safe-pb sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="min-w-0 lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <Shield className="h-5 w-5" aria-hidden />
              </span>
              <span className="text-base font-semibold tracking-tight text-slate-900">OpenChainGuard</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
              Governance and oversight for autonomous agents—policy, identity, and human review in one operator-grade
              console.
            </p>
            <div className="mt-6 flex gap-2">
              <SocialIcon href="https://twitter.com" label="X (Twitter)">
                <Twitter className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href="https://github.com" label="GitHub">
                <Github className="h-4 w-4" />
              </SocialIcon>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-8 md:grid-cols-4 lg:col-span-8">
            {footerNav.map((col) => (
              <div key={col.title}>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900">{col.title}</h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((item) => (
                    <li key={`${col.title}-${item.label}`}>
                      {"to" in item ? (
                        <Link to={item.to} className="text-sm text-slate-600 transition-colors hover:text-slate-900">
                          {item.label}
                        </Link>
                      ) : (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="text-sm text-slate-600 transition-colors hover:text-slate-900"
                        >
                          {item.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-slate-200 pt-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-md">
            <h3 className="text-sm font-semibold text-slate-900">Stay updated</h3>
            <p className="mt-1 text-sm text-slate-600">Product announcements and governance releases (demo).</p>
            <form
              className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <Input
                type="email"
                placeholder="Work email"
                className="h-10 border-slate-200 bg-white sm:max-w-xs"
                aria-label="Email for updates"
              />
              <Button type="submit" className="h-10 shrink-0 sm:w-auto">
                Subscribe
              </Button>
            </form>
          </div>
          <p className="text-xs text-slate-500 lg:text-right">
            © {new Date().getFullYear()} OpenChainGuard. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
