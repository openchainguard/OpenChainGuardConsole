import { Copy, ExternalLink } from "lucide-react";
import { truncateAddress } from "@/lib/mockData";
import { useState } from "react";

interface CopyAddressProps {
  address: string;
  showBasescan?: boolean;
}

export function CopyAddress({ address, showBasescan }: CopyAddressProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="inline-flex items-center gap-1.5">
      <span className="font-mono text-xs text-muted-foreground">{truncateAddress(address)}</span>
      <button onClick={handleCopy} className="p-0.5 rounded hover:bg-muted transition-colors">
        <Copy className="w-3 h-3 text-muted-foreground" />
      </button>
      {copied && <span className="text-[10px] text-success">Copied!</span>}
      {showBasescan && (
        <a href="#" className="p-0.5 rounded hover:bg-muted transition-colors">
          <ExternalLink className="w-3 h-3 text-muted-foreground" />
        </a>
      )}
    </div>
  );
}
