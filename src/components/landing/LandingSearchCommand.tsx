import {
  ArrowUpRight,
  BarChart3,
  Cpu,
  Github,
  Layers,
  LayoutDashboard,
  Shield,
} from "lucide-react";
import type { NavigateFunction } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  goToSection: (id: string) => void;
  navigate: NavigateFunction;
};

export function LandingSearchCommand({ open, onOpenChange, goToSection, navigate }: Props) {
  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search sections and pages…" />
      <CommandList>
        <CommandEmpty>No matches.</CommandEmpty>
        <CommandGroup heading="This page">
          <CommandItem value="platform overview" onSelect={() => goToSection("platform")}>
            <Layers className="mr-2 h-4 w-4 opacity-60" />
            Platform
          </CommandItem>
          <CommandItem value="solutions capabilities product" onSelect={() => goToSection("product")}>
            <Cpu className="mr-2 h-4 w-4 opacity-60" />
            Solutions
          </CommandItem>
          <CommandItem value="protocol how fits together" onSelect={() => goToSection("protocol")}>
            <Shield className="mr-2 h-4 w-4 opacity-60" />
            How the protocol fits together
          </CommandItem>
          <CommandItem value="resources docs" onSelect={() => goToSection("resources")}>
            <ArrowUpRight className="mr-2 h-4 w-4 opacity-60" />
            Resources
          </CommandItem>
          <CommandItem value="developers integrate sdk" onSelect={() => goToSection("developers")}>
            <Github className="mr-2 h-4 w-4 opacity-60" />
            Developers
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="App">
          <CommandItem
            value="console dashboard operators"
            onSelect={() => {
              onOpenChange(false);
              navigate("/agents");
            }}
          >
            <LayoutDashboard className="mr-2 h-4 w-4 opacity-60" />
            Open the console
          </CommandItem>
          <CommandItem
            value="stats metrics protocol footprint"
            onSelect={() => {
              onOpenChange(false);
              navigate("/stats");
            }}
          >
            <BarChart3 className="mr-2 h-4 w-4 opacity-60" />
            Protocol metrics
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
