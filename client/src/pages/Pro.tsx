import React from "react";
import { MobileHeader } from "@/components/Header";
import { SectionHeader } from "@/components/SectionHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ban, CloudOff } from "lucide-react";

export default function Pro() {
  return (
    <div className="pb-24 md:pb-10">
      <MobileHeader title="Pro Features" />
      <main className="md:pt-28 max-w-4xl mx-auto px-4 md:px-6">
        <SectionHeader title="Go Pro" description="Unlock advanced features for RND Hub." />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover-elevate">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Ban className="w-5 h-5" />
                No Ads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Enjoy a completely ad-free experience while browsing school news and schedules.</p>
            </CardContent>
          </Card>

          <Card className="hover-elevate">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <CloudOff className="w-5 h-5" />
                Offline Mode
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Access previously loaded information even when you're not connected to the internet.</p>
              <p className="text-[10px] text-primary/60 mt-4 font-mono uppercase tracking-tighter italic">Service Worker Active (Placeholder)</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}