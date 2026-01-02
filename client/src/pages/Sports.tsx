import { MobileHeader } from "@/components/Header";
import { SectionHeader } from "@/components/SectionHeader";
import { useSports, useClubs } from "@/hooks/use-data";
import { format } from "date-fns";
import { Trophy, Info, ShieldCheck, Leaf, Snowflake, Flower2, Activity, Star, Calendar, Clock, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const SEASON_ICONS: Record<string, any> = {
  "Fall": Leaf,
  "Winter": Snowflake,
  "Spring": Flower2,
  "Year-Round": Activity
};

const SEASONS = {
  Fall: ["Cross Country", "Football", "Boys Volleyball", "Girls Basketball", "Golf", "Girls Field Hockey"],
  Winter: ["Girls Volleyball", "Boys Basketball", "Curling", "Hockey", "Badminton"],
  Spring: ["Soccer", "Track & Field", "Girls Softball", "Tennis", "Baseball"],
  "Year-Round": ["Cheer"]
};

export default function Sports() {
  const { data: sports, isLoading: sportsLoading } = useSports();
  const { data: clubs, isLoading: clubsLoading } = useClubs();
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("favoriteSports");
    return saved ? JSON.parse(saved) : [];
  });

  const toggleFavorite = (sportName: string) => {
    setFavorites(prev => {
      const next = prev.includes(sportName) 
        ? prev.filter(s => s !== sportName)
        : [...prev, sportName];
      localStorage.setItem("favoriteSports", JSON.stringify(next));
      return next;
    });
  };

  const getCurrentSeason = () => {
    const month = new Date().getMonth();
    if (month >= 8 && month <= 10) return "Fall";
    if (month >= 11 || month <= 2) return "Winter";
    if (month >= 3 && month <= 5) return "Spring";
    return "Off-Season";
  };

  const currentSeason = getCurrentSeason();

  const sortedSeasons = Object.entries(SEASONS).sort(([a], [b]) => {
    if (a === currentSeason) return -1;
    if (b === currentSeason) return 1;
    return 0;
  });

  if (sportsLoading || clubsLoading) return <div className="p-6 md:pt-32 text-center text-muted-foreground text-sm font-bold uppercase tracking-widest">Loading sports...</div>;

  const seasonalClubs = clubs?.filter(c => c.name.includes("Season") || c.name.includes("Year-Round")) || [];

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

        <SectionHeader title="Panthers Athletics" description="Schedules, tryouts, and team updates." />

        {/* Favorites Section */}
        {favorites.length > 0 && (
          <section className="mb-12 space-y-6">
            <h3 className="font-display font-bold text-2xl flex items-center gap-2 text-secondary">
              <Star className="w-6 h-6 fill-current" />
              Your Favorite Sports
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {favorites.map(sport => {
                const sportUpdates = sports?.filter(s => s.sportName === sport) || [];
                return (
                  <div key={sport} className="bg-card rounded-2xl border border-secondary ring-1 ring-secondary/20 p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-lg text-foreground">{sport}</h4>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-secondary"
                        onClick={() => toggleFavorite(sport)}
                      >
                        <Star className="h-5 w-5 fill-current" />
                      </Button>
                    </div>
                    {sportUpdates.length > 0 ? (
                      <div className="space-y-3">
                        {sportUpdates.map(update => (
                          <div key={update.id} className="bg-secondary/5 rounded-xl p-3 border border-secondary/10">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                                {update.type}
                              </span>
                              <span className="text-[10px] font-medium text-muted-foreground">
                                {format(new Date(update.date), 'MMM d, h:mm a')}
                              </span>
                            </div>
                            <p className="font-bold text-sm mb-1">{update.title}</p>
                            {update.location && (
                              <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground uppercase">
                                <MapPin className="w-3 h-3" /> {update.location}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground italic uppercase tracking-widest py-2">No recent updates</p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* All Seasons */}
        <div className="space-y-12 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sortedSeasons.map(([season, sportList]) => {
              const Icon = SEASON_ICONS[season] || Info;
              const isInSeason = season === currentSeason || season === "Year-Round";

              return (
                <section key={season} className="space-y-6">
                  <h3 className="font-display font-bold text-2xl flex items-center justify-between text-primary">
                    <div className="flex items-center gap-2">
                      <Icon className="w-6 h-6 text-secondary" />
                      {season}
                      {isInSeason && (
                        <span className="ml-2 text-[10px] bg-green-500 text-white px-2 py-0.5 rounded-full uppercase tracking-widest flex items-center gap-1">
                          <Activity className="w-3 h-3" />
                          In Session
                        </span>
                      )}
                    </div>
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {sportList.map(sport => {
                      const isFavorited = favorites.includes(sport);
                      const sportUpdates = sports?.filter(s => s.sportName === sport) || [];

                      return (
                        <div key={sport} className={cn(
                          "bg-card rounded-2xl border transition-all p-5 shadow-sm group",
                          isFavorited ? "border-secondary ring-1 ring-secondary/20" : "border-border hover:border-primary/20"
                        )}>
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-bold text-lg text-foreground">{sport}</h4>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className={cn("h-8 w-8", isFavorited ? "text-secondary" : "text-muted-foreground")}
                              onClick={() => toggleFavorite(sport)}
                            >
                              <Star className={cn("h-5 w-5", isFavorited && "fill-current")} />
                            </Button>
                          </div>

                          {sportUpdates.length > 0 ? (
                            <div className="space-y-3">
                              {sportUpdates.map(update => (
                                <div key={update.id} className="bg-primary/5 rounded-xl p-3 border border-primary/10">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                                      {update.type}
                                    </span>
                                    <span className="text-[10px] font-medium text-muted-foreground">
                                      {format(new Date(update.date), 'MMM d, h:mm a')}
                                    </span>
                                  </div>
                                  <p className="font-bold text-sm mb-1">{update.title}</p>
                                  <div className="flex flex-wrap gap-3 mt-2">
                                    {update.location && (
                                      <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground uppercase">
                                        <MapPin className="w-3 h-3" /> {update.location}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-xs text-muted-foreground italic uppercase tracking-widest py-2">
                              No recent updates
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
