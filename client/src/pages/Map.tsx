import React from "react";
import { MobileHeader } from "@/components/Header";
import { SectionHeader } from "@/components/SectionHeader";

export default function MapPage() {
  return (
    <div className="pb-24 md:pb-10">
      <MobileHeader title="School Map" />
      <main className="md:pt-28 max-w-4xl mx-auto px-4 md:px-6">
        <SectionHeader title="School Map" description="Find your way around RND." />
        <div className="bg-muted rounded-2xl aspect-[16/10] flex items-center justify-center border-2 border-dashed border-border">
          <p className="text-muted-foreground font-medium">Map Interactive View - Placeholder</p>
        </div>
      </main>
    </div>
  );
}