import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { SettingsPayload } from "@/types";

const settingsSchema = z.object({
  companyName: z.string().min(2),
  contactEmail: z.string().email(),
  timezone: z.string().min(2),
  weeklyDigest: z.boolean(),
  productUpdates: z.boolean(),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

type SettingsFormProps = {
  defaultValues: SettingsPayload;
  onSubmit: (values: SettingsPayload) => Promise<void>;
  isSaving: boolean;
};

export const SettingsForm = ({ defaultValues, onSubmit, isSaving }: SettingsFormProps) => {
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    values: {
      companyName: defaultValues.profile.companyName,
      contactEmail: defaultValues.profile.contactEmail,
      timezone: defaultValues.profile.timezone,
      weeklyDigest: defaultValues.preferences.weeklyDigest,
      productUpdates: defaultValues.preferences.productUpdates,
    },
  });

  const submit = form.handleSubmit(async (values) => {
    await onSubmit({
      profile: {
        companyName: values.companyName,
        contactEmail: values.contactEmail,
        timezone: values.timezone,
      },
      preferences: {
        weeklyDigest: values.weeklyDigest,
        productUpdates: values.productUpdates,
      },
    });
  });

  return (
    <form className="space-y-8" onSubmit={submit}>
      <div className="space-y-4">
        <div>
          <p className="text-sm font-semibold">Workspace identity</p>
          <p className="text-sm text-[var(--muted-foreground)]">Core metadata used by notifications, exports and admin messaging.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company name</Label>
            <Input id="companyName" {...form.register("companyName")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactEmail">Contact email</Label>
            <Input id="contactEmail" {...form.register("contactEmail")} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Input id="timezone" {...form.register("timezone")} />
          </div>
        </div>
      </div>

      <div className="space-y-4 rounded-[0.9rem] border border-[var(--border)] bg-[var(--surface-panel)] p-5">
        <div>
          <p className="text-sm font-semibold">Delivery preferences</p>
          <p className="text-sm text-[var(--muted-foreground)]">Control what the ops team receives by default.</p>
        </div>
        <div className="flex items-center justify-between gap-4 rounded-[0.8rem] border border-[var(--border)] bg-[var(--surface)] p-4">
          <div>
            <p className="font-medium">Weekly digest</p>
            <p className="text-sm text-[var(--muted-foreground)]">Receive a weekly summary of product health.</p>
          </div>
          <Switch
            checked={form.watch("weeklyDigest")}
            onCheckedChange={(checked) => form.setValue("weeklyDigest", checked)}
          />
        </div>
        <div className="flex items-center justify-between gap-4 rounded-[0.8rem] border border-[var(--border)] bg-[var(--surface)] p-4">
          <div>
            <p className="font-medium">Product updates</p>
            <p className="text-sm text-[var(--muted-foreground)]">Get notified about new releases and changes.</p>
          </div>
          <Switch
            checked={form.watch("productUpdates")}
            onCheckedChange={(checked) => form.setValue("productUpdates", checked)}
          />
        </div>
      </div>

      <Button type="submit" disabled={isSaving}>
        {isSaving ? "Saving..." : "Save settings"}
      </Button>
    </form>
  );
};
