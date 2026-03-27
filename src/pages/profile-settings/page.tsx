import { useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export default function ProfileSettings() {
  const [name, setName] = useState("Personal");
  const [email, setEmail] = useState("personal@example.com");
  const [org, setOrg] = useState("OpenChainGuard");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const { theme, setTheme } = useTheme();

  return (
    <div className="max-w-2xl w-full">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-foreground">Profile settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account profile and preferences.</p>
      </div>

      <div className="bg-card rounded-lg border">
        <div className="px-5 py-4 border-b">
          <h2 className="text-sm font-medium text-foreground">Profile</h2>
        </div>
        <div className="p-5 space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label className="text-xs text-muted-foreground">Name</Label>
              <Input className="h-9" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
            </div>

            <div className="grid gap-2">
              <Label className="text-xs text-muted-foreground">Email</Label>
              <Input
                className="h-9"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
              />
            </div>

            <div className="grid gap-2 md:col-span-2">
              <Label className="text-xs text-muted-foreground">Organization</Label>
              <Input className="h-9" value={org} onChange={(e) => setOrg(e.target.value)} placeholder="Organization" />
            </div>
          </div>

          <div className="rounded-lg border bg-muted/20 px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="min-w-0">
              <div className="text-sm font-medium text-foreground">Email alerts</div>
              <div className="text-xs text-muted-foreground">Receive notifications for escalations and incidents.</div>
            </div>
            <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} />
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2 pt-1">
            <Button className="w-full sm:w-auto" variant="outline" onClick={() => toast.info("Reset", { description: "This is a demo." })}>
              Reset
            </Button>
            <Button
              className="w-full sm:w-auto"
              onClick={() =>
                toast.success("Saved", {
                  description: `Updated profile for ${name || "user"}.`,
                })
              }
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

