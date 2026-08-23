import { Bell, Mail, Menu, Palette, PanelLeftClose, PanelLeftOpen, Search } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { navItems } from "@/components/layout/nav-items";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
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
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/features/auth/auth-context";
import { useTheme } from "@/features/theme/theme-context";
import { canAccess } from "@/lib/rbac";
import { cn } from "@/lib/utils";

type TopbarProps = {
  collapsed: boolean;
  onToggleSidebar: () => void;
};

export const Topbar = ({ collapsed, onToggleSidebar }: TopbarProps) => {
  const { session, logout } = useAuth();
  const { theme, themeId, themes, setThemeId } = useTheme();
  const location = useLocation();
  const currentItem = navItems.find((item) => location.pathname.startsWith(item.href));
  const visibleNavItems = navItems.filter((item) => canAccess(session?.user.role, item.roles));

  return (
    <header className="sticky top-4 z-10 flex flex-col gap-3 rounded-[0.9rem] border border-[var(--topbar-border)] bg-[var(--topbar)] px-3 py-3 shadow-[var(--shadow-topbar)] backdrop-blur md:flex-row md:items-center md:justify-between md:px-4">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden"
              aria-label="Open navigation"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[min(92vw,24rem)] p-0">
            <div className="border-b border-[var(--border)] px-5 py-4">
              <DialogTitle className="text-base">Navigation</DialogTitle>
              <DialogDescription className="mt-1 text-sm text-[var(--muted-foreground)]">
                Move through the admin template.
              </DialogDescription>
            </div>
            <nav className="space-y-2 p-4">
              {visibleNavItems.map((item) => (
                <DialogClose asChild key={item.href}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      cn(
                        "block rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-[var(--foreground)] text-[var(--background)]"
                          : "bg-[var(--surface-subtle)] text-[var(--foreground)]",
                      )
                    }
                  >
                    {item.title}
                  </NavLink>
                </DialogClose>
              ))}
            </nav>
          </DialogContent>
        </Dialog>

        <Button
          variant="outline"
          size="icon"
          onClick={onToggleSidebar}
          className="hidden lg:inline-flex"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <PanelLeftOpen className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </Button>

        <div className="relative hidden flex-1 md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
          <input
            aria-label="Search dashboard data"
            className="h-10 w-full rounded-lg border border-[var(--border)] bg-[var(--surface-panel)] pl-9 pr-4 text-sm text-[var(--foreground)] outline-none transition-colors focus:border-[var(--ring)]"
            placeholder="Search data..."
            type="search"
          />
        </div>

        <div className="min-w-0 md:hidden">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
            {currentItem?.title ?? "Overview"}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 md:gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Theme switcher">
              <Palette className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel>Theme palette</DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={themeId}
              onValueChange={(value) => setThemeId(value as typeof themeId)}
            >
              {themes.map((entry) => (
                <DropdownMenuRadioItem key={entry.id} value={entry.id}>
                  <div className="flex w-full items-center justify-between gap-4">
                    <div>
                      <p className="font-medium">{entry.label}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">
                        {entry.mode === "dark" ? "Dark" : "Light"} palette
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {entry.preview.map((swatch) => (
                        <span
                          key={swatch}
                          className="h-3.5 w-3.5 rounded-full border border-black/10"
                          style={{ backgroundColor: swatch }}
                        />
                      ))}
                    </div>
                  </div>
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" aria-label="Messages" className="hidden sm:inline-flex">
          <Mail className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Notifications"
          className="hidden sm:inline-flex"
        >
          <Bell className="h-4 w-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-2 py-1.5 transition-colors hover:bg-[var(--surface-panel)]"
            >
              <Avatar className="h-9 w-9">
                <AvatarFallback>{session?.user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="hidden text-left md:block">
                <p className="text-sm font-medium leading-none">{session?.user.name}</p>
                <p className="mt-1 text-xs text-[var(--muted-foreground)]">{session?.user.role}</p>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{session?.user.organization}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="sm:hidden">{theme.label}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => void logout()}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
