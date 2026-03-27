import { useNavigate } from "react-router-dom";
import { Shield, LayoutGrid, SlidersHorizontal, ShieldCheck, ClipboardList, Activity, Trophy, LogOut, User, Settings2 } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { toast } from "sonner";

const navItems = [
  { title: "Agent Directory", url: "/console", icon: LayoutGrid },
  { title: "Policy Editor", url: "/policy", icon: SlidersHorizontal },
  { title: "Approval Queue", url: "/approvals", icon: ShieldCheck },
  { title: "Audit Log", url: "/audit", icon: ClipboardList },
  { title: "Protocol Stats", url: "/stats", icon: Activity },
  { title: "Agent Leaderboard", url: "/leaderboard", icon: Trophy },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const userName = "Personal";
  const userInitials = "P";
  const userEmail = "personal@example.com";
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarContent className="bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border">
        {/* Logo */}
        <div className={`${collapsed ? "p-2.5 justify-center" : "p-3"} flex items-center gap-2`}>
          {collapsed ? (
            <SidebarTrigger className="text-sidebar-muted hover:text-sidebar-foreground" />
          ) : (
            <>
              <div className="w-9 h-9 rounded-lg bg-sidebar-primary text-sidebar-primary-foreground flex items-center justify-center flex-shrink-0 shadow-sm">
                <Shield className="w-5 h-5" />
              </div>
              <div className="ml-auto">
                <SidebarTrigger className="text-sidebar-muted hover:text-sidebar-foreground" />
              </div>
            </>
          )}
        </div>

        {/* Nav */}
        <SidebarGroup className="flex-1 px-2">
          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/console"}
                      className={
                        collapsed
                          ? "flex items-center justify-center h-9 px-2 rounded-md text-sm text-sidebar-muted hover:bg-sidebar-foreground/5 hover:text-sidebar-foreground transition-colors"
                          : "flex items-center h-9 px-3 rounded-md text-sm text-sidebar-muted hover:bg-sidebar-foreground/5 hover:text-sidebar-foreground transition-colors"
                      }
                      activeClassName="bg-sidebar-foreground/5 text-sidebar-foreground font-medium"
                    >
                      <item.icon className={collapsed ? "w-4 h-4 flex-shrink-0" : "w-4 h-4 mr-3 flex-shrink-0"} />
                      {!collapsed && <span className="text-sm truncate">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarFooter className="px-2 pb-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className={
                      collapsed
                        ? "w-full h-10 px-2 flex items-center justify-center rounded-md text-sidebar-muted hover:bg-sidebar-foreground/5 hover:text-sidebar-foreground transition-colors"
                        : "w-full h-10 px-3 flex items-center rounded-md text-sidebar-muted hover:bg-sidebar-foreground/5 hover:text-sidebar-foreground transition-colors"
                    }
                  >
                    <div className={
                      collapsed
                        ? "h-7 w-7 rounded-full bg-muted text-foreground flex items-center justify-center text-xs font-semibold flex-shrink-0"
                        : "h-7 w-7 rounded-full bg-muted text-foreground flex items-center justify-center text-xs font-semibold mr-3 flex-shrink-0"
                    }>
                      {userInitials}
                    </div>
                    {!collapsed && (
                      <div className="min-w-0 text-left">
                        <div className="text-sm font-medium text-sidebar-foreground truncate">{userName}</div>
                        <div className="text-[11px] text-sidebar-muted truncate">Account</div>
                      </div>
                    )}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top" align="start" className="w-56">
                  <div className="px-2 py-1.5">
                    <div className="text-sm font-medium text-foreground">{userName}</div>
                    <div className="text-xs text-muted-foreground truncate">{userEmail}</div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="gap-2"
                    onClick={() => {
                      navigate("/profile");
                    }}
                  >
                    <User className="h-4 w-4" />
                    Profile settings
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                  <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">Appearance</DropdownMenuLabel>
                  <div className="px-2 py-1.5">
                    <div className="flex items-center justify-between gap-3 rounded-md border bg-muted/30 px-3 py-2">
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-foreground">Dark</div>
                        <div className="text-xs text-muted-foreground">Toggle theme</div>
                      </div>
                      <Switch checked={theme === "dark"} onCheckedChange={(v) => setTheme(v ? "dark" : "light")} />
                    </div>
                  </div>

                  <DropdownMenuItem
                    className="gap-2"
                    onClick={() => toast.info("Preferences", { description: "Coming soon." })}
                  >
                    <Settings2 className="h-4 w-4" />
                    Preferences
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="gap-2 text-destructive focus:text-destructive"
                    onClick={() => toast.info("Signed out", { description: "This is a demo — no real session." })}
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>

      </SidebarContent>
    </Sidebar>
  );
}
