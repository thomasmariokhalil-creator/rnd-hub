import { MobileHeader } from "@/components/Header";
import { SectionHeader } from "@/components/SectionHeader";
import { useSports } from "@/hooks/use-data";
import { format } from "date-fns";
import { Trophy, CalendarClock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Sports() {
  const { data: sports, isLoading } = useSports();

  const results = sports?.filter(s => !!s.result).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const upcoming = sports?.filter(s => !s.result).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  if (isLoading) return <div className="p-6 md:pt-32"><p className="text-center text-muted-foreground">Loading sports...</p></div>;

  return (
    <div className="pb-24 md:pb-10">
      <MobileHeader title="Sports Center" />
      
      <main className="md:pt-28 max-w-5xl mx-auto px-4 md:px-6">
        <SectionHeader title="Panthers Athletics" description="Scores, schedules, and team updates." />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Upcoming Games Column */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-display font-bold text-xl flex items-center gap-2">
              <CalendarClock className="w-5 h-5 text-secondary" />
              Upcoming Games
            </h3>
            
            <div className="space-y-4">
              {upcoming?.length ? upcoming.map((game, idx) => (
                <div 
                  key={game.id} 
                  className="bg-card rounded-xl p-5 border border-border/60 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4 animate-in"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="flex flex-col items-center justify-center bg-muted/50 rounded-lg w-16 h-16 shrink-0 border border-border">
                    <span className="text-xs font-bold uppercase text-muted-foreground">{format(new Date(game.date), 'MMM')}</span>
                    <span className="text-2xl font-display font-bold text-primary">{format(new Date(game.date), 'd')}</span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="text-xs font-bold text-secondary-foreground/60 uppercase tracking-wider mb-1">
                      {format(new Date(game.date), 'EEEE • h:mm a')}
                    </div>
                    <h4 className="font-bold text-lg">{game.title}</h4>
                    <p className="text-muted-foreground text-sm flex items-center gap-1.5 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block" />
                      {game.location || "TBD"}
                    </p>
                  </div>

                  <div className="mt-2 sm:mt-0">
                    <button className="w-full sm:w-auto px-4 py-2 bg-primary text-primary-foreground text-sm font-bold rounded-lg hover:bg-primary/90 transition-colors">
                      Game Details
                    </button>
                  </div>
                </div>
              )) : (
                <p className="text-muted-foreground italic">No upcoming games scheduled.</p>
              )}
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-display font-bold text-xl flex items-center gap-2">
              <Trophy className="w-5 h-5 text-secondary" />
              Recent Results
            </h3>

            <div className="space-y-4">
               {results?.length ? results.map((game, idx) => {
                 const isWin = game.result?.startsWith('W');
                 return (
                  <div 
                    key={game.id} 
                    className="bg-card rounded-xl p-4 border border-border/60 shadow-sm flex items-center gap-4 animate-in"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shrink-0 shadow-sm",
                      isWin ? "bg-green-600" : "bg-muted-foreground"
                    )}>
                      {isWin ? 'W' : 'L'}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm">{game.title}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{format(new Date(game.date), 'MMM d')}</p>
                    </div>
                    <div className="font-display font-bold text-lg text-foreground">
                      {game.result?.split(' ').slice(1).join(' ')}
                    </div>
                  </div>
                );
               }) : (
                 <p className="text-muted-foreground italic">No recent results.</p>
               )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
