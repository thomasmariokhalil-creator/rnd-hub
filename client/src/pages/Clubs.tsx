import React from "react";
import { MobileHeader } from "@/components/Header";
import { SectionHeader } from "@/components/SectionHeader";
import { useClubs } from "@/hooks/use-data";
import { Calendar, Clock, MapPin } from "lucide-react";

export default function Clubs() {
  const { data: clubs, isLoading } = useClubs();

  if (isLoading) return <div className="p-6 md:pt-32"><p className="text-center text-muted-foreground">Loading clubs...</p></div>;

  const seasons = ["Fall", "Winter", "Spring"];

  return (
    <div className="pb-24 md:pb-10">
      <MobileHeader title="Clubs & Activities" />
      
      <main className="md:pt-28 max-w-6xl mx-auto px-4 md:px-6">
        <SectionHeader title="Get Involved" description="Discover clubs and activities strictly organized by season." />

        {seasons.map((season) => {
          const seasonClubs = clubs?.filter(c => c.season === season) || [];
          if (seasonClubs.length === 0 && season !== "Fall") return null;

          return (
            <div key={season} className="mb-12">
              <h2 className="text-2xl font-display font-bold text-[#800000] mb-6 flex items-center gap-3">
                <span className="w-8 h-1 bg-primary rounded-full" />
                {season} Season
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {seasonClubs.length > 0 ? seasonClubs.map((club, idx) => (
                  <div 
                    key={club.id} 
                    className="bg-card rounded-xl border border-border/60 p-4 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-4 animate-in"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-foreground truncate">
                        {club.name}
                      </h3>
                      <div className="grid grid-cols-1 gap-1 mt-1">
                        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-bold uppercase tracking-tight">
                          <Calendar className="w-3 h-3" />
                          <span className="truncate">Next: {club.meetingTime || "TBD"}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-bold uppercase tracking-tight">
                          <Clock className="w-3 h-3" />
                          <span>Time: {club.meetingTime?.split("at")[1]?.trim() || "Lunch"}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-bold uppercase tracking-tight">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate">Room: {club.location || "TBD"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="col-span-full py-10 bg-muted/30 rounded-2xl border border-dashed border-border text-center">
                    <p className="text-muted-foreground italic">No clubs listed for this season yet.</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}

// Helper needed since Users icon wasn't imported in my logic head
import { Users } from "lucide-react";
