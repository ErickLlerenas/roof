import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowRight, ShieldCheck, Zap, Layers } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between p-6 border-b bg-background">
        <div className="flex items-center gap-2 font-bold text-xl">
          <Calculator className="h-6 w-6 text-primary" />
          <span>RoofMetrics</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              The #1 SaaS for Roofing Contractors
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Measure roofs and close deals <span className="text-primary">in minutes.</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              All-in-one CRM, satellite roof measurement, and automated estimate generator for professional roofers.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link href="/login">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8 h-14">
                  Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex-1 w-full relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-blue-500/20 rounded-2xl blur-3xl -z-10"></div>
            <img 
              src="/satellite-roof-map.png" 
              alt="Satellite map view of a roof measurement" 
              className="rounded-2xl shadow-2xl border w-full object-cover aspect-video md:aspect-square"
            />
          </div>
        </section>

        <section className="py-24 bg-muted/50">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold">Everything you need to grow</h2>
              <p className="text-muted-foreground mt-4 text-lg">Stop using paper and start closing deals on the spot.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-background p-8 rounded-xl border shadow-sm">
                <Layers className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Smart CRM</h3>
                <p className="text-muted-foreground">Manage leads, track insurance claims, and organize your clients in one place.</p>
              </div>
              <div className="bg-background p-8 rounded-xl border shadow-sm">
                <ShieldCheck className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Accurate Measurements</h3>
                <p className="text-muted-foreground">Draw directly on high-res satellite maps. We calculate pitch and waste automatically.</p>
              </div>
              <div className="bg-background p-8 rounded-xl border shadow-sm">
                <Zap className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Instant Estimates</h3>
                <p className="text-muted-foreground">Generate professional PDF proposals on the spot and get signatures faster.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t p-6 md:px-12 lg:px-24 bg-background">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div>© 2026 RoofMetrics SaaS. All rights reserved.</div>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary">Terms</Link>
            <Link href="#" className="hover:text-primary">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
