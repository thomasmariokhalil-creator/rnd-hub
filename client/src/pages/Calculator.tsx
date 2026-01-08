import React, { useState } from "react";
import { MobileHeader } from "@/components/Header";
import { SectionHeader } from "@/components/SectionHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, Plus, Trash2, GraduationCap } from "lucide-react";

interface Assignment {
  id: string;
  mark: number | "";
  weight: number | "";
}

export default function CalculatorPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([
    { id: "1", mark: "", weight: "" }
  ]);

  const addAssignment = () => {
    setAssignments([...assignments, { id: Date.now().toString(), mark: "", weight: "" }]);
  };

  const removeAssignment = (id: string) => {
    if (assignments.length > 1) {
      setAssignments(assignments.filter(a => a.id !== id));
    }
  };

  const updateAssignment = (id: string, field: keyof Assignment, value: string) => {
    const numValue = value === "" ? "" : parseFloat(value);
    setAssignments(assignments.map(a => 
      a.id === id ? { ...a, [field]: numValue } : a
    ));
  };

  const calculateAverage = () => {
    let totalWeightedScore = 0;
    let totalWeight = 0;

    assignments.forEach(a => {
      if (typeof a.mark === "number" && typeof a.weight === "number") {
        totalWeightedScore += (a.mark * a.weight);
        totalWeight += a.weight;
      }
    });

    return totalWeight > 0 ? (totalWeightedScore / totalWeight).toFixed(2) : "0.00";
  };

  return (
    <div className="pb-24 md:pb-10">
      <MobileHeader title="Average Calculator" />
      <main className="md:pt-28 max-w-2xl mx-auto px-4 md:px-6">
        <SectionHeader 
          title="Weighted Average Calculator" 
          description="Calculate your running average for each course." 
        />

        <Card className="mb-8">
          <CardHeader className="bg-primary/5 border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-primary font-display flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Running Average
              </CardTitle>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-primary/10">
                <GraduationCap className="w-5 h-5 text-secondary" />
                <span className="text-2xl font-black text-primary">{calculateAverage()}%</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-2 gap-4 px-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Mark (%)</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Weight (%)</span>
            </div>

            {assignments.map((a, index) => (
              <div key={a.id} className="flex items-center gap-3 animate-in fade-in slide-in-from-left duration-300" style={{ animationDelay: `${index * 50}ms` }}>
                <Input
                  type="number"
                  placeholder="e.g. 85"
                  value={a.mark}
                  onChange={(e) => updateAssignment(a.id, "mark", e.target.value)}
                  className="rounded-xl font-bold"
                />
                <Input
                  type="number"
                  placeholder="e.g. 20"
                  value={a.weight}
                  onChange={(e) => updateAssignment(a.id, "weight", e.target.value)}
                  className="rounded-xl font-bold"
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="shrink-0 text-muted-foreground hover:text-red-600"
                  onClick={() => removeAssignment(a.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}

            <Button 
              variant="outline" 
              className="w-full mt-4 rounded-xl border-dashed border-2 hover:bg-primary/5 text-primary font-bold"
              onClick={addAssignment}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Assignment
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-primary text-white p-6 rounded-2xl shadow-xl overflow-hidden relative">
          <div className="relative z-10">
            <h4 className="font-display font-bold text-lg mb-2 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-secondary" />
              How it works
            </h4>
            <p className="text-white/80 text-xs leading-relaxed">
              Your average is calculated by multiplying each mark by its weight, summing those results, and dividing by the total weight entered. This gives you a true "running average" based on your current progress.
            </p>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        </Card>
      </main>
    </div>
  );
}