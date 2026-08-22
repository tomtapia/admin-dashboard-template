import { AlertTriangle, LoaderCircle } from "lucide-react";

type StatePanelProps = {
  title: string;
  description: string;
  kind: "loading" | "error";
};

export const StatePanel = ({ title, description, kind }: StatePanelProps) => (
  <div className="flex min-h-56 flex-col items-center justify-center gap-4 rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] text-center">
    <div className="rounded-full bg-[var(--muted)] p-4">
      {kind === "loading" ? (
        <LoaderCircle className="h-6 w-6 animate-spin text-[var(--foreground)]" />
      ) : (
        <AlertTriangle className="h-6 w-6 text-amber-600" />
      )}
    </div>
    <div>
      <p className="font-medium">{title}</p>
      <p className="mt-1 text-sm text-[var(--muted-foreground)]">{description}</p>
    </div>
  </div>
);
