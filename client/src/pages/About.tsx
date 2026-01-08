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
            <CardTitle className="text-primary font-display">Our History</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none text-foreground/80 leading-relaxed">
            <p>
              Regiopolis-Notre Dame Catholic High School (RND) has a rich heritage in Kingston, Ontario. 
              Founded through the merger of Regiopolis College (established in 1837) and Notre Dame Convent, 
              RND continues to be a pillar of academic and spiritual excellence. 
            </p>
            <p>
              Known for our strong community spirit, competitive athletics (Garnet & Gold), and dedication 
              to the arts and social justice, RND fosters an environment where students can truly flourish.
            </p>
            
            <div className="mt-10 pt-6 border-t border-border flex flex-col items-center">
              <p className="text-sm font-bold text-primary">Developer: Thomas Khalil</p>
              <p className="text-xs text-muted-foreground mt-1">Version 2.0.0 (2026)</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}