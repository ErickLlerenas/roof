"use client";

import { Sidebar } from "./Sidebar";
import { Menu, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { TooltipProvider } from "./ui/tooltip";
import { createClient } from "@/lib/supabase/client";
import { usePathname, useRouter } from "next/navigation";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Don't show layout on auth pages or landing page
  if (pathname === '/' || pathname.startsWith('/login') || pathname.startsWith('/auth')) {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <TooltipProvider>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="flex flex-col border-r bg-muted/40 hidden md:flex h-full">
          <Sidebar />
          <div className="mt-auto p-4 border-t">
            <Button variant="outline" className="w-full justify-start text-muted-foreground" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center justify-between gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 md:hidden">
            <div className="flex items-center gap-4">
              <Sheet>
                <SheetTrigger>
                  <div className="shrink-0 md:hidden inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                  </div>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col p-0 w-64">
                  <div className="flex h-14 items-center border-b px-4">
                    <span className="font-semibold">RoofMetrics SaaS</span>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    <Sidebar />
                  </div>
                  <div className="mt-auto p-4 border-t">
                    <Button variant="outline" className="w-full justify-start text-muted-foreground" onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
              <span className="font-semibold md:hidden">RoofMetrics</span>
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
