import { useState } from "react";
import { Bell, Wallet, ChevronDown, ShieldAlert, RotateCcw, X } from "lucide-react";
import { truncateAddress } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface TopNavbarProps {
  circuitBreakerActive?: boolean;
}

export function TopNavbar({ circuitBreakerActive = true }: TopNavbarProps) {
  const [cbModalOpen, setCbModalOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const [disconnectOpen, setDisconnectOpen] = useState(false);

  return (
    <>
      <header className="h-14 flex items-center justify-between border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
        <div className="flex items-center gap-3">
          <div className="leading-tight">
            <div className="text-sm font-semibold text-foreground">OpenChainGuard</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-xs font-medium gap-1.5 px-3 py-1.5">
            <div className="w-2 h-2 rounded-full bg-primary" />
            Base
          </Badge>
          <button className="relative p-2 rounded-lg hover:bg-muted transition-colors" onClick={() => setCbModalOpen(true)}>
            <Bell className="w-4 h-4 text-muted-foreground" />
            {circuitBreakerActive && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
            )}
          </button>
          <button onClick={() => setWalletOpen(true)} className="flex items-center gap-2 bg-primary text-primary-foreground px-3 h-9 rounded-lg text-xs font-medium hover:bg-primary/90 transition-colors">
            <Wallet className="w-3.5 h-3.5" />
            <span className="font-mono">{truncateAddress('0xDev10000000000000000000000000000000000001')}</span>
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>
      </header>

      {/* Circuit Breaker Full Modal */}
      <Dialog open={cbModalOpen} onOpenChange={setCbModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <ShieldAlert className="w-5 h-5" />
              Circuit Breaker Tripped
            </DialogTitle>
            <DialogDescription>An agent has exceeded the safety threshold and has been automatically frozen.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4 space-y-3">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Agent</span><span className="font-semibold text-foreground">Liquidity Guard</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Trigger</span><span className="font-medium text-destructive">Attempted to move 12% of wallet in one transaction</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Threshold</span><span className="font-medium text-foreground">5%</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Status</span><span className="font-semibold text-destructive">FROZEN</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Time</span><span className="font-mono text-xs text-foreground">{new Date().toLocaleString()}</span></div>
            </div>
            <div>
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                <span>Multisig Reset Progress</span>
                <span>1 of 3 signatures</span>
              </div>
              <Progress value={33} className="h-1.5" />
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => { setCbModalOpen(false); toast.info("Alert dismissed", { description: "Liquidity Guard remains frozen." }); }} className="gap-2">
              <X className="w-4 h-4" /> Dismiss Alert
            </Button>
            <Button onClick={() => { setCbModalOpen(false); toast.success("Reset initiated", { description: "Awaiting 2 more multisig signatures to unfreeze." }); }} className="gap-2">
              <RotateCcw className="w-4 h-4" /> Reset with Multisig
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Wallet Dialog */}
      <Dialog open={walletOpen} onOpenChange={setWalletOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Connected Wallet</DialogTitle>
            <DialogDescription>Your wallet connection details.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="bg-muted rounded-lg p-3 text-xs space-y-2">
              <div className="flex justify-between"><span className="text-muted-foreground">Address</span><span className="font-mono text-foreground">0xDev1...0001</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Network</span><span className="font-medium text-foreground">Base</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Balance</span><span className="font-medium text-foreground">24,500 USDC</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Role</span><span className="font-medium text-primary">Admin (3/5 Multisig)</span></div>
            </div>
            <Button variant="outline" className="w-full text-destructive border-destructive hover:bg-destructive/10" onClick={() => { setWalletOpen(false); setDisconnectOpen(true); }}>
              Disconnect Wallet
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Disconnect Confirmation */}
      <AlertDialog open={disconnectOpen} onOpenChange={setDisconnectOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Disconnect Wallet?</AlertDialogTitle>
            <AlertDialogDescription>You will lose access to governance functions until you reconnect.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={() => toast.info("Wallet disconnected", { description: "This is a demo — wallet remains connected." })}>
              Disconnect
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
