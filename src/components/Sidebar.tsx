import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  Calculator,
  Briefcase,
  Menu,
  Contact,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const routes = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/leads", label: "Leads", icon: Briefcase },
  { href: "/clientes", label: "Clients", icon: Users },
  { href: "/contacts", label: "Contacts", icon: Contact },
  { href: "/cotizador", label: "Estimate / Map", icon: Calculator },
  { href: "/templates", label: "Templates", icon: FileText },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto bg-muted/40">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Calculator className="h-6 w-6" />
          <span className="">RoofMetrics SaaS</span>
        </Link>
      </div>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4 mt-4 space-y-1">
          {routes.map((route) => {
            const Icon = route.icon;
            const isActive =
              pathname === route.href ||
              (pathname.startsWith(route.href) && route.href !== "/");

            return (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  isActive ? "bg-muted text-primary" : "",
                )}
              >
                <Icon className="h-4 w-4" />
                {route.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
