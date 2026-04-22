export type DocsNavItem = {
  to: string;
  label: string;
  /** Use exact path match (e.g. `/docs` vs `/docs/agent-runtime`) */
  end?: boolean;
};

export type DocsNavGroup = {
  section: string;
  items: readonly DocsNavItem[];
};

export const docsNav: readonly DocsNavGroup[] = [
  {
    section: "Get started",
    items: [
      { to: "/docs", label: "Overview", end: true },
      { to: "/docs/agent-runtime", label: "Agent runtime" },
    ],
  },
  {
    section: "Learn",
    items: [{ to: "/protocol-overview", label: "Protocol overview" }],
  },
] as const;
