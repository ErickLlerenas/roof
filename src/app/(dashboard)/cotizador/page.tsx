"use client";

import { useState } from "react";
import { RoofMap } from "@/components/RoofMap";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PDFDownloadButton } from "@/components/PDFDownloadButton";

// Pitch multipliers
const PITCH_MULTIPLIERS: Record<string, number> = {
  "0/12": 1.0, // Flat
  "4/12": 1.054,
  "6/12": 1.118,
  "8/12": 1.202,
  "10/12": 1.302,
  "12/12": 1.414,
};

export default function CotizadorPage() {
  const [flatArea, setFlatArea] = useState<number>(0);
  const [pitch, setPitch] = useState<string>("6/12");
  const [wasteFactor, setWasteFactor] = useState<number>(10); // %

  const pitchMultiplier = PITCH_MULTIPLIERS[pitch] || 1.0;
  
  // Calculations
  const pitchAdjustedArea = flatArea * pitchMultiplier;
  const wasteArea = pitchAdjustedArea * (wasteFactor / 100);
  const finalArea = pitchAdjustedArea + wasteArea;
  const squares = Math.ceil(finalArea / 100);

  const pdfData = {
    flatArea,
    pitch,
    wasteFactor,
    pitchAdjustedArea,
    wasteArea,
    finalArea,
    squares
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Roof Estimate (Measurement)</h1>
        <p className="text-muted-foreground">Measure the roof by drawing on the satellite map to estimate materials.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Satellite Map</CardTitle>
            <CardDescription>
              Use the polygon tool on the top left of the map to draw the roof perimeter.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RoofMap onAreaCalculated={(area) => setFlatArea(area)} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Area & Material Calculation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Flat Area (Drawn)</Label>
              <div className="text-2xl font-bold">{flatArea.toFixed(2)} sq ft</div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <div className="space-y-2">
                <Label htmlFor="pitch">Roof Pitch</Label>
                <Select value={pitch} onValueChange={(val) => setPitch(val || "6/12")}>
                  <SelectTrigger id="pitch">
                    <SelectValue placeholder="Select pitch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0/12">0/12 (Flat - Multiplier 1.0)</SelectItem>
                    <SelectItem value="4/12">4/12 (Multiplier 1.054)</SelectItem>
                    <SelectItem value="6/12">6/12 (Multiplier 1.118)</SelectItem>
                    <SelectItem value="8/12">8/12 (Multiplier 1.202)</SelectItem>
                    <SelectItem value="10/12">10/12 (Multiplier 1.302)</SelectItem>
                    <SelectItem value="12/12">12/12 (Multiplier 1.414)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="waste">Waste Factor (%)</Label>
                <Input 
                  id="waste" 
                  type="number" 
                  value={wasteFactor} 
                  onChange={(e) => setWasteFactor(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t bg-muted/50 p-4 rounded-lg">
              <div className="flex justify-between text-sm">
                <span>Pitch Adjusted Area:</span>
                <span>{pitchAdjustedArea.toFixed(2)} sq ft</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Waste (+{wasteFactor}%):</span>
                <span>{wasteArea.toFixed(2)} sq ft</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 mt-2 border-t border-border">
                <span>Total Estimated:</span>
                <span>{finalArea.toFixed(2)} sq ft</span>
              </div>
              <div className="flex justify-between font-bold text-primary text-xl mt-2">
                <span>Materials Needed:</span>
                <span>{squares} SQ</span>
              </div>
            </div>

            <PDFDownloadButton data={pdfData} disabled={flatArea === 0} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
