import React from "react";
import { MobileHeader } from "@/components/Header";
import { SectionHeader } from "@/components/SectionHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertTriangle, Info } from "lucide-react";

export default function SnowDay() {
  const percentage = 15; // Placeholder
  const status = "Not Likely"; // Not Likely, Moderate, Highly Likely
  
  return (
    <div className="pb-24 md:pb-10">
      <MobileHeader title="Snow Day Predictor" />
      <main className="md:pt-28 max-w-4xl mx-auto px-4 md:px-6">
        <SectionHeader title="Snow Day Predictor" description="Prediction for Kingston, ON." />

        <Card className="max-w-md mx-auto overflow-hidden">
          <CardHeader className="bg-primary/5 text-center pb-8">
            <CardTitle className="text-3xl font-display font-bold text-[#800000]">Snow Day Predictor</CardTitle>
            <p className="text-muted-foreground">Kingston, ON</p>
          </CardHeader>
          <CardContent className="flex flex-col items-center -mt-6">
            <div className="relative w-48 h-48 flex items-center justify-center bg-white rounded-full shadow-xl border-8 border-primary/10">
              <div className="text-center">
                <span className="text-5xl font-bold text-primary">{percentage}%</span>
                <p className="text-xs text-muted-foreground font-medium mt-1 uppercase tracking-widest">Chance</p>
              </div>
            </div>
            
            <div className="mt-8">
              <Badge 
                className={
                  status === "Not Likely" ? "bg-red-600 text-white hover:bg-red-700 px-6 py-1.5 text-base" :
                  status === "Moderate" ? "bg-yellow-500 text-white hover:bg-yellow-600 px-6 py-1.5 text-base" :
                  "bg-white border-2 border-primary text-primary px-6 py-1.5 text-base"
                }
              >
                {status}
              </Badge>
            </div>

            <div className="w-full mt-10 space-y-4 border-t pt-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <p className="text-sm text-foreground/80">Aggregates real-time weather data from Environment Canada.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <p className="text-sm text-foreground/80">Analyzes historical Tri-Board cancellation patterns for predictive modeling.</p>
              </div>
            </div>

            <footer className="w-full mt-8 flex items-center gap-2 text-[10px] text-muted-foreground text-center justify-center italic">
              <Info className="w-3 h-3" />
              For informational purposes only. Predictions are not guarantees. Always check official Tri-Board communications.
            </footer>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}