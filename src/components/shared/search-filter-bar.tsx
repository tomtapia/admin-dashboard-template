import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type SearchFilterBarProps = {
  value: string;
  onChange: (value: string) => void;
  resultCount?: number;
};

export const SearchFilterBar = ({ value, onChange, resultCount }: SearchFilterBarProps) => (
  <div className="flex flex-col gap-4 rounded-[1rem] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--shadow-card)] md:flex-row md:items-center md:justify-between">
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-sm font-semibold">Directory controls</p>
        {typeof resultCount === "number" ? <Badge variant="outline">{resultCount} visible</Badge> : null}
      </div>
      <p className="text-sm text-[var(--muted-foreground)]">Search by name, email or role and keep follow-up work visible without opening a detail view.</p>
      <div className="flex flex-wrap gap-2">
        <span className="rounded-full bg-[var(--surface-panel)] px-3 py-1 text-xs font-medium text-[var(--foreground-muted)]">Active only</span>
        <span className="rounded-full bg-[var(--surface-panel)] px-3 py-1 text-xs font-medium text-[var(--foreground-muted)]">Billing owners</span>
        <span className="rounded-full bg-[var(--surface-panel)] px-3 py-1 text-xs font-medium text-[var(--foreground-muted)]">Pending invites</span>
      </div>
    </div>
    <div className="w-full md:max-w-sm">
      <Label htmlFor="users-search" className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
        Search users
      </Label>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
        <Input
          id="users-search"
          type="search"
          aria-label="Search users"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="pl-9"
          placeholder="Search users"
        />
      </div>
    </div>
  </div>
);
