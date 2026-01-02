import { MobileHeader } from "@/components/Header";
import { SectionHeader } from "@/components/SectionHeader";
import { useSports, useClubs } from "@/hooks/use-data";
import { format } from "date-fns";
import { Trophy, CalendarClock, Info, ShieldCheck, Leaf, Snowflake, Flower2, Activity } from "lucide-react";

const SEASON_ICONS: Record<string, any> = {
  "Fall": Leaf,
  "Winter": Snowflake,
  "Spring": Flower2,
  "Year-Round": Activity
};

export default function Sports() {
  const { data: sports, isLoading: sportsLoading } = useSports();
  const { data: clubs, isLoading: clubsLoading } = useClubs();

  const upcoming = sports?.filter(s => !s.result && !s.isTryout).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const tryouts = sports?.filter(s => s.isTryout).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const availableSports = clubs?.find(c => c.name.includes("Available Sports"));

  if (sportsLoading || clubsLoading) return <div className="p-6 md:pt-32 text-center text-muted-foreground text-sm font-bold uppercase tracking-widest">Loading sports...</div>;

  return (
    <div className="pb-24 md:pb-10 bg-background min-h-screen">
      <MobileHeader title="Sports" />
      
      <main className="md:pt-28 max-w-4xl mx-auto px-4 md:px-6">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-8 flex items-start gap-3 animate-in">
          <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p className="text-sm font-bold text-primary leading-tight uppercase tracking-tight">
            Athletes should have athletic forms signed and ready to give to coaches
          </p>
        </div>

        <SectionHeader title="Panthers Athletics" description="Schedules and team updates." />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="space-y-6">
            <h3 className="font-display font-bold text-xl flex items-center gap-2 text-primary">
              <CalendarClock className="w-5 h-5 text-secondary" />
              Upcoming Games
            </h3>
            
            <div className="space-y-4">
              {upcoming?.length ? upcoming.map((game) => (
                <div key={game.id} className="bg-card rounded-xl p-5 border border-border shadow-sm flex items-center gap-4 hover:border-primary/20 transition-all">
                  <div className="flex flex-col items-center justify-center bg-secondary/20 rounded-lg w-14 h-14 shrink-0 border border-secondary/30">
                    <span className="text-[10px] font-bold uppercase text-primary/60">{format(new Date(game.date), 'MMM')}</span>
                    <span className="text-xl font-display font-bold text-primary">{format(new Date(game.date), 'd')}</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">{format(new Date(game.date), 'EEEE • h:mm a')}</div>
                    <h4 className="font-bold text-base leading-tight">{game.title}</h4>
                    <p className="text-muted-foreground text-xs font-bold mt-1 uppercase tracking-tight">{game.location || "TBD"}</p>
                  </div>
                </div>
              )) : <p className="text-xs text-muted-foreground italic uppercase tracking-widest">No upcoming games.</p>}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-display font-bold text-xl flex items-center gap-2 text-primary">
              <Trophy className="w-5 h-5 text-secondary" />
              Tryouts
            </h3>
            <div className="space-y-4">
              {tryouts?.length ? tryouts.map((game) => (
                <div key={game.id} className="bg-card rounded-xl p-5 border border-border shadow-sm flex items-center gap-4 hover:border-primary/20 transition-all">
                  <div className="flex flex-col items-center justify-center bg-primary rounded-lg w-14 h-14 shrink-0 border border-primary">
                    <span className="text-[10px] font-bold uppercase text-white/60">{format(new Date(game.date), 'MMM')}</span>
                    <span className="text-xl font-display font-bold text-white">{format(new Date(game.date), 'd')}</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">{format(new Date(game.date), 'EEEE • h:mm a')}</div>
                    <h4 className="font-bold text-base leading-tight">{game.title}</h4>
                    <p className="text-muted-foreground text-xs font-bold mt-1 uppercase tracking-tight">{game.location || "Main Gym"}</p>
                  </div>
                </div>
              )) : <p className="text-xs text-muted-foreground italic uppercase tracking-widest">No upcoming tryouts.</p>}
            </div>

            {clubs && (
              <div className="mt-8 pt-6 border-t border-border">
                <h3 className="font-display font-bold text-xl flex items-center gap-2 text-primary mb-4">
                  <Info className="w-5 h-5 text-secondary" />
                  Available Sports by Season
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {clubs
                    .filter(c => c.name.includes("Season") || c.name.includes("Year-Round"))
                    .map(season => {
                      const Icon = Object.entries(SEASON_ICONS).find(([key]) => season.name.includes(key))?.[1] || Info;
                      return (
                        <div key={season.id} className="bg-secondary/10 border border-secondary/20 rounded-xl p-5 flex gap-4">
                          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="text-primary font-bold uppercase tracking-widest text-xs mb-2">{season.name}</h4>
                            <p className="text-sm font-bold text-primary uppercase tracking-tight leading-relaxed">
                              {season.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
