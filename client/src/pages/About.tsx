import React from "react";
import { MobileHeader } from "@/components/Header";
import { SectionHeader } from "@/components/SectionHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function About() {
  return (
    <div className="pb-24 md:pb-10">
      <MobileHeader title="About" />
      <main className="md:pt-28 max-w-4xl mx-auto px-4 md:px-6">
        <SectionHeader title="About RND Hub" description="Regiopolis-Notre Dame Catholic High School." />

        <Card>
          <CardHeader>
            <CardTitle className="text-primary font-display">Our History & Mission</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none text-foreground/80 leading-relaxed">
            <p>
              Regiopolis-Notre Dame Catholic High School is a cornerstone of the Kingston community, with a rich history dating back to 1845. As the oldest English Catholic secondary school in Canada, RND is dedicated to academic excellence, spiritual growth, and the Garnet and Gold spirit. This Student Hub was developed by Thomas Khalil to empower students with the tools they need to navigate school life efficiently.
            </p>
            
            <div className="mt-10 pt-6 border-t border-border flex flex-col items-center">
              <p className="text-sm font-bold text-primary">Developer: Thomas Khalil</p>
              <p className="text-xs text-muted-foreground mt-1">Version 2.1.0 (2026)</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}