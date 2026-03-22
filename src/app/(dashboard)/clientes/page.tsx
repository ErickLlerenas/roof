"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface InsuranceDetails {
  company?: string;
  claimNumber?: string;
  adjusterName?: string;
  adjusterPhone?: string;
  adjusterEmail?: string;
  metWithAdjuster?: boolean;
}

interface ClientJob {
  id: number;
  fullName: string;
  company: string;
  address: string;
  phone: string;
  email: string;
  status: "pending" | "accepted" | "payed" | "completed";
  priority: "high" | "normal" | "low";
  notes?: string;
  insuranceDetails?: InsuranceDetails;
}

const initialClients: ClientJob[] = [
  { 
    id: 1, 
    fullName: "Alice Brown", 
    company: "Brown Estates", 
    address: "321 Elm St, Naples, FL", 
    phone: "(239) 555-8888", 
    email: "alice@brownestates.com", 
    status: "accepted", 
    priority: "high",
    notes: "Contract signed on Oct 5th.",
    insuranceDetails: { company: "Allstate", claimNumber: "AL-12345", metWithAdjuster: true }
  },
  { 
    id: 2, 
    fullName: "Bob Wilson", 
    company: "Wilson Dev", 
    address: "654 Cedar Ln, Fort Myers, FL", 
    phone: "(239) 555-9999", 
    email: "bob@wilsondev.com", 
    status: "completed", 
    priority: "normal",
    notes: "Job finished, waiting for final review."
  },
];

export default function ClientesPage() {
  const [clients, setClients] = useState<ClientJob[]>(initialClients);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<ClientJob | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<Omit<ClientJob, "id">>({
    fullName: "",
    company: "",
    address: "",
    phone: "",
    email: "",
    status: "accepted",
    priority: "normal",
    notes: "",
    insuranceDetails: {
      company: "",
      claimNumber: "",
      adjusterName: "",
      adjusterPhone: "",
      adjusterEmail: "",
      metWithAdjuster: false
    }
  });

  const handleOpenDialog = (client?: ClientJob) => {
    if (client) {
      setEditingClient(client);
      setFormData({
        fullName: client.fullName,
        company: client.company,
        address: client.address,
        phone: client.phone,
        email: client.email,
        status: client.status,
        priority: client.priority,
        notes: client.notes || "",
        insuranceDetails: {
          company: client.insuranceDetails?.company || "",
          claimNumber: client.insuranceDetails?.claimNumber || "",
          adjusterName: client.insuranceDetails?.adjusterName || "",
          adjusterPhone: client.insuranceDetails?.adjusterPhone || "",
          adjusterEmail: client.insuranceDetails?.adjusterEmail || "",
          metWithAdjuster: client.insuranceDetails?.metWithAdjuster || false,
        }
      });
    } else {
      setEditingClient(null);
      setFormData({
        fullName: "", company: "", address: "", phone: "", email: "", 
        status: "accepted", priority: "normal", notes: "",
        insuranceDetails: { company: "", claimNumber: "", adjusterName: "", adjusterPhone: "", adjusterEmail: "", metWithAdjuster: false }
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingClient(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("insurance_")) {
      const field = name.replace("insurance_", "");
      setFormData(prev => ({
        ...prev,
        insuranceDetails: { ...prev.insuranceDetails, [field]: value }
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingClient) {
      setClients(clients.map(c => c.id === editingClient.id ? { ...formData, id: c.id } : c));
    } else {
      setClients([...clients, { ...formData, id: clients.length > 0 ? Math.max(...clients.map(c => c.id)) + 1 : 1 }]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this client?")) {
      setClients(clients.filter(c => c.id !== id));
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
          <p className="text-muted-foreground">Directory of clients with approved projects.</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger render={<Button onClick={() => handleOpenDialog()} />}>
            <Plus className="mr-2 h-4 w-4" />
            New Client
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingClient ? "Edit Client (Job)" : "Add New Client (Job)"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6 py-4">
              {/* Contact Info */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg border-b pb-2">Contact Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" name="company" value={formData.company} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                  </div>
                </div>
              </div>

              {/* Job Details */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg border-b pb-2">Job Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select value={formData.priority} onValueChange={(v: any) => setFormData(p => ({...p, priority: v}))}>
                      <SelectTrigger><SelectValue placeholder="Select priority" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select value={formData.status} onValueChange={(v: any) => setFormData(p => ({...p, status: v}))}>
                      <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="accepted">Accepted</SelectItem>
                        <SelectItem value="payed">Payed</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea id="notes" name="notes" placeholder="Any special requirements..." value={formData.notes} onChange={handleChange} />
                  </div>
                </div>
              </div>

              {/* Insurance Details */}
              <div className="space-y-4 bg-muted/50 p-4 rounded-lg border">
                <h3 className="font-semibold text-lg border-b border-border pb-2">Insurance Details (Optional)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="insurance_company">Insurance Company</Label>
                    <Input id="insurance_company" name="insurance_company" value={formData.insuranceDetails?.company} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="insurance_claimNumber">Claim Number</Label>
                    <Input id="insurance_claimNumber" name="insurance_claimNumber" value={formData.insuranceDetails?.claimNumber} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="insurance_adjusterName">Adjuster Name</Label>
                    <Input id="insurance_adjusterName" name="insurance_adjusterName" value={formData.insuranceDetails?.adjusterName} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="insurance_adjusterPhone">Adjuster Phone</Label>
                    <Input id="insurance_adjusterPhone" name="insurance_adjusterPhone" value={formData.insuranceDetails?.adjusterPhone} onChange={handleChange} />
                  </div>
                  <div className="flex items-center space-x-2 col-span-2 mt-2">
                    <Checkbox 
                      id="insurance_metWithAdjuster" 
                      checked={formData.insuranceDetails?.metWithAdjuster}
                      onCheckedChange={(checked) => setFormData(p => ({
                        ...p, 
                        insuranceDetails: { ...p.insuranceDetails, metWithAdjuster: checked === true }
                      }))}
                    />
                    <Label htmlFor="insurance_metWithAdjuster" className="font-normal cursor-pointer">
                      Already met with the adjuster?
                    </Label>
                  </div>
                </div>
              </div>

              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={handleCloseDialog}>Cancel</Button>
                <Button type="submit">{editingClient ? "Save Changes" : "Create Client"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Full name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Insurance</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No clients found.
                  </TableCell>
                </TableRow>
              ) : (
                clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">
                      <div>{client.fullName}</div>
                      <div className="text-xs text-muted-foreground">{client.phone}</div>
                    </TableCell>
                    <TableCell>
                      <div className="truncate max-w-[200px]">{client.address}</div>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        client.status === 'accepted' ? 'bg-blue-100 text-blue-800' : 
                        client.status === 'completed' ? 'bg-green-100 text-green-800' :
                        client.status === 'payed' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {client.status.toUpperCase()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${client.priority === 'high' ? 'bg-red-100 text-red-800' : client.priority === 'normal' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                        {client.priority.toUpperCase()}
                      </span>
                    </TableCell>
                    <TableCell>
                      {client.insuranceDetails?.company ? (
                        <span className="text-sm font-medium">{client.insuranceDetails.company}</span>
                      ) : (
                        <span className="text-sm text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(client)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleDelete(client.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
