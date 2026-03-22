import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, Plus } from "lucide-react";

export default function TemplatesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Templates</h1>
          <p className="text-muted-foreground">Manage your document templates for estimates, contracts, and invoices.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Template
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:border-primary cursor-pointer transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-500" />
              Standard Estimate
            </CardTitle>
            <CardDescription>Default template for residential roof replacements.</CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:border-primary cursor-pointer transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-green-500" />
              Commercial Contract
            </CardTitle>
            <CardDescription>Legal contract template for commercial roofing projects.</CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:border-primary cursor-pointer transition-colors border-dashed bg-muted/50 flex items-center justify-center min-h-[160px]">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Plus className="h-8 w-8" />
            <span className="font-medium">Create Blank Template</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
