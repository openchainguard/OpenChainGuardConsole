import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MarketingArticle } from "@/components/landing/MarketingArticle";
import { MarketingLayout } from "@/components/landing/MarketingLayout";

export default function ContactPage() {
  return (
    <MarketingLayout>
      <MarketingArticle
        title="Contact"
        subtitle="Reach the OpenChainGuard team for partnerships, pilots, and product questions (demo)."
      >
        <p>
          For demo purposes, this form does not send email. Replace the handler with your API or form service when you wire
          production.
        </p>
        <form
          className="!mt-10 space-y-5 rounded-2xl border border-slate-200 bg-slate-50/80 p-6 sm:p-8"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="contact-name">Name</Label>
            <Input id="contact-name" name="name" type="text" autoComplete="name" className="bg-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-email">Work email</Label>
            <Input id="contact-email" name="email" type="email" autoComplete="email" className="bg-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-message">Message</Label>
            <Textarea id="contact-message" name="message" rows={5} className="resize-y bg-white" />
          </div>
          <Button type="submit" className="w-full sm:w-auto">
            Send message
          </Button>
        </form>
      </MarketingArticle>
    </MarketingLayout>
  );
}
