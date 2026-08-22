export type ThemeMode = "light" | "dark";
export const themeStorageKey = "admin-dashboard-theme";

export const themeDefinitions = [
  {
    id: "oneui-ash",
    label: "Core Light",
    mode: "light",
    preview: ["#f3f5f8", "#dbe2ea", "#2563eb"],
  },
  {
    id: "midnight-ops",
    label: "Midnight Ops",
    mode: "dark",
    preview: ["#111827", "#1f2937", "#7dd3fc"],
  },
] as const;

export type ThemeId = (typeof themeDefinitions)[number]["id"];

export type ThemeDefinition = {
  id: ThemeId;
  label: string;
  mode: ThemeMode;
  preview: readonly [string, string, string];
};

export const defaultThemeId: ThemeId = "oneui-ash";

export const isThemeId = (value: string | null): value is ThemeId =>
  themeDefinitions.some((theme) => theme.id === value);
