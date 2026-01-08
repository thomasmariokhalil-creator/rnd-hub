import React from "react";
import { MobileHeader } from "@/components/Header";
import { SectionHeader } from "@/components/SectionHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, School, GraduationCap, ArrowRight } from "lucide-react";

export default function SchoolGuide() {
  const pathways = [
    {
      title: "De-streamed",
      level: "Grade 9",
      icon: School,
      description: "Starting in 2022, all Grade 9 students take the same core courses (Math, Science, English) to keep all post-secondary options open.",
      color: "border-primary/20 bg-primary/5"
    },
    {
      title: "Academic",
      level: "Grade 10-12",
      icon: BookOpen,
      description: "Focuses on theory and abstract problems. Prepares students for University (U) and University/College (M) destination courses.",
      color: "border-blue-200 bg-blue-50"
    },
    {
      title: "Applied",
      level: "Grade 10",
      icon: GraduationCap,
      description: "Focuses on practical applications and concrete examples. Prepares students for College (C) destination courses.",
      color: "border-orange-200 bg-orange-50"
    }
  ];

  return (
    <div className="pb-24 md:pb-10">
      <MobileHeader title="School Guide" />
      <main className="md:pt-28 max-w-4xl mx-auto px-4 md:px-6">
        <SectionHeader title="School Guide" description="Everything you need to navigate your academics at RND." />

        <section className="mb-10">
          <h2 className="text-2xl font-display font-bold text-primary mb-6">Course Pathways</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pathways.map((path) => (
              <Card key={path.title} className={`${path.color} border-2`}>
                <CardHeader className="pb-2">
                  <path.icon className="w-8 h-8 text-primary mb-2" />
                  <CardTitle className="text-lg font-bold">{path.title}</CardTitle>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{path.level}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {path.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-card border border-border rounded-2xl p-8 shadow-sm text-center">
          <h3 className="font-display font-bold text-xl mb-4 text-primary">Plan Your Future</h3>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Use myBlueprint to track your credits, explore career paths, and plan your high school courses.
          </p>
          <a href="https://app.myblueprint.ca/" target="_blank" rel="noopener noreferrer">
            <Button className="bg-[#800000] hover:bg-[#600000] text-white font-bold px-8 py-6 rounded-xl shadow-lg hover-elevate group">
              myBlueprint Login
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
        </section>
      </main>
    </div>
  );
}