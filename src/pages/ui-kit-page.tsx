import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { notifySuccess } from "@/lib/notify";

const BUTTON_VARIANTS = ["default", "secondary", "outline", "ghost"] as const;

const TYPOGRAPHY_SAMPLES = [
  { className: "text-[1.8rem] font-semibold leading-[1] tracking-[-0.04em]", label: "Heading 1" },
  { className: "text-2xl font-semibold tracking-[-0.03em]", label: "Heading 2" },
  { className: "text-base font-semibold", label: "Heading 3" },
  {
    className: "text-sm text-[var(--foreground-muted)]",
    label: "Body copy — used for descriptions and table content across the template.",
  },
  {
    className: "text-xs uppercase tracking-[0.18em] text-[var(--muted-foreground)]",
    label: "Eyebrow label",
  },
];

export const UiKitPage = () => {
  const [digest, setDigest] = useState(true);
  const [name, setName] = useState("Northstar");
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="UI Elements"
        title="UI Kit"
        description="Every primitive shipped with the template, in one place. Controls are live — click them."
      />

      <SectionCard title="Typography" description="The type scale used across every page.">
        <div className="space-y-4">
          {TYPOGRAPHY_SAMPLES.map((sample) => (
            <p key={sample.label} className={sample.className}>
              {sample.label}
            </p>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Buttons"
        description="Variants fire a toast so nothing on this page is decorative."
      >
        <div className="flex flex-wrap items-center gap-3">
          {BUTTON_VARIANTS.map((variant) => (
            <Button
              key={variant}
              variant={variant}
              onClick={() => notifySuccess(`${variant} button clicked`)}
            >
              {variant}
            </Button>
          ))}
          <Button variant="outline" size="sm">
            Small
          </Button>
          <Button variant="outline" size="icon" aria-label="Icon button">
            ★
          </Button>
        </div>
      </SectionCard>

      <SectionCard title="Badges" description="Status colors mirror the semantic tokens.">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
        </div>
      </SectionCard>

      <SectionCard
        title="Form controls"
        description="Controlled input and switch wired to local state."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="ui-kit-company">Company name</Label>
            <Input
              id="ui-kit-company"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Company name"
            />
            <p className="text-xs text-[var(--muted-foreground)]" aria-live="polite">
              {name.length} characters
            </p>
          </div>
          <div className="flex items-center justify-between gap-4 rounded-[0.8rem] border border-[var(--border)] bg-[var(--surface-panel)] p-4">
            <div className="space-y-1">
              <Label htmlFor="ui-kit-digest">Weekly digest</Label>
              <p className="text-xs text-[var(--muted-foreground)]">Toggle reflects instantly.</p>
            </div>
            <Switch
              id="ui-kit-digest"
              checked={digest}
              onCheckedChange={setDigest}
              aria-label="Weekly digest"
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Overlays" description="Dialog and dropdown-menu primitives.">
        <div className="flex flex-wrap items-center gap-3">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Open dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Example dialog</DialogTitle>
              <DialogDescription>
                Radix dialog styled with the template tokens. Press Escape or close to dismiss.
              </DialogDescription>
              <div className="flex justify-end">
                <Button onClick={() => setDialogOpen(false)}>Confirm</Button>
              </div>
            </DialogContent>
          </Dialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Open dropdown</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => notifySuccess("First action")}>
                First action
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => notifySuccess("Second action")}>
                Second action
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SectionCard>

      <SectionCard title="Loading" description="Skeleton primitives used across the template.">
        <div className="flex flex-wrap items-center gap-4">
          <Skeleton className="h-10 w-40 rounded-lg" />
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-56" />
            <Skeleton className="h-3 w-72" />
          </div>
        </div>
      </SectionCard>
    </div>
  );
};
