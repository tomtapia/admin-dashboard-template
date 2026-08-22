import { Inbox } from "lucide-react";

type EmptyStateProps = {
  title: string;
  description: string;
};

export const EmptyState = ({ title, description }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-[var(--border)] bg-[var(--surface-subtle)] px-6 py-14 text-center">
    <div className="mb-4 rounded-full bg-[var(--muted)] p-4">
      <Inbox className="h-6 w-6 text-[var(--foreground)]" />
    </div>
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="mt-2 max-w-md text-sm text-[var(--muted-foreground)]">{description}</p>
  </div>
);
