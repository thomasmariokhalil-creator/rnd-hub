import React from "react";
import { MobileHeader } from "@/components/Header";
import { SectionHeader } from "@/components/SectionHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Info, Gauge } from "lucide-react";

export default function SnowDay() {
  const percentage = 15; // Placeholder
  const status = "Not Likely"; // Not Likely, Moderate, Highly Likely
  
  return (
    <div className="pb-24 md:pb-10">
      <MobileHeader title="Snow Day Predictor" />
      <main className="md:pt-28 max-w-4xl mx-auto px-4 md:px-6">
        <SectionHeader title="Snow Day Predictor" description="Prediction for Kingston, ON." />

        <Card className="max-w-md mx-auto overflow-hidden">
          <CardHeader className="bg-primary/5 text-center pb-8 border-b border-primary/10">
            <CardTitle className="text-3xl font-display font-bold text-[#800000]">Snow Day Predictor</CardTitle>
            <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs mt-1">Kingston, ON</p>
          </CardHeader>
          <CardContent className="flex flex-col items-center py-10">
            <div className="relative w-48 h-48 flex items-center justify-center bg-white rounded-full shadow-2xl border-8 border-primary/5">
              <div className="text-center">
                <Gauge className="w-8 h-8 text-primary/20 mx-auto mb-1" />
                <span className="text-5xl font-black text-primary">{percentage}%</span>
                <p className="text-[10px] text-muted-foreground font-bold mt-1 uppercase tracking-[0.2em]">Chance</p>
              </div>
            </div>
            
            <div className="mt-8">
              <Badge 
                className={
                  status === "Not Likely" ? "bg-red-600 text-white hover:bg-red-700 px-8 py-2 text-base font-bold rounded-full shadow-lg" :
                  status === "Moderate" ? "bg-yellow-500 text-white hover:bg-yellow-600 px-8 py-2 text-base font-bold rounded-full shadow-lg" :
                  "bg-[#800000] text-white px-8 py-2 text-base font-bold rounded-full shadow-lg"
                }
              >
                {status}
              </Badge>
            </div>

            <div className="w-full mt-12 space-y-4 bg-muted/30 p-6 rounded-2xl border border-border">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Data Sources</h4>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <p className="text-sm font-medium text-foreground/80 leading-tight">Environment Canada Weather Data</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <p className="text-sm font-medium text-foreground/80 leading-tight">Tri-Board Historical Cancellation Patterns</p>
              </div>
            </div>

            <footer className="w-full mt-8 flex items-start gap-3 p-4 bg-primary/5 rounded-xl border border-primary/10">
              <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <p className="text-[10px] text-muted-foreground font-medium leading-relaxed uppercase tracking-tight">
                For informational purposes only. Predictions are not guarantees. Always check official Tri-Board communications for final decisions.
              </p>
            </footer>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}