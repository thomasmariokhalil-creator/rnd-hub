import { useAnnouncements, useMenu, useFeatured, useSports, useClubs } from "@/hooks/use-data";
import { FeaturedCarousel } from "@/components/FeaturedCarousel";
import { SectionHeader } from "@/components/SectionHeader";
import { MobileHeader } from "@/components/Header";
import { format } from "date-fns";
import { Utensils, Calendar, Star, Activity, Shirt, Users, CloudSnow, AlertTriangle } from "lucide-react";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function Home() {
  const { data: announcements, isLoading: newsLoading } = useAnnouncements();
  const { data: menuItems, isLoading: menuLoading } = useMenu();
  const { data: featured, isLoading: featuredLoading } = useFeatured();
  const { data: sports, isLoading: sportsLoading } = useSports();
  const { data: clubs, isLoading: clubsLoading } = useClubs();

  const [favorites, setFavorites] = useState<string[]>([]);
  const [dressCode, setDressCode] = useState<"Full Uniform" | "Spirit Theme">("Full Uniform");

  useEffect(() => {
    const saved = localStorage.getItem("favoriteSports");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const todayStr = format(new Date(), 'yyyy-MM-dd');
  const todayMenu = menuItems?.find(item => item.date === todayStr);
  const latestNews = announcements?.slice(0, 3);
  const todayClubs = clubs?.filter(c => c.meetingTime?.toLowerCase().includes("today") || c.meetingTime?.toLowerCase().includes(format(new Date(), 'EEEE').toLowerCase()));

  const filteredFeatured = featured?.filter(item => 
    !item.title.toLowerCase().includes("welcome") && 
    !item.title.toLowerCase().includes("student hub")
  );

  const favoriteUpdates = sports?.filter(s => favorites.includes(s.sportName))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 4);

  // Example probability - in a real app this would come from an API
  const snowDayProbability = 55;

  // Example probability - in a real app this would come from an API
  const snowDayProbability = 55;

  return (
    <div className="pb-24 md:pb-10 bg-background min-h-screen flex flex-col">
      {/* Smart Snow Day Warning - Garnet-colored banner at the VERY top */}
      {snowDayProbability > 50 && (
        <div className="bg-[#800000] text-white py-3 px-4 text-center sticky top-0 z-[100] shadow-md border-b border-white/10">
          <Link href="/snow-day" className="flex items-center justify-center gap-2 font-bold text-sm md:text-base hover:underline underline-offset-4">
            <AlertTriangle className="w-5 h-5 text-[#FFD700]" />
            <span>⚠️ Possible Snow Day Tomorrow. Check the Snow Day Predictor for details.</span>
          </Link>
        </div>
      )}

      <MobileHeader />

      <main className="md:pt-24 max-w-4xl mx-auto px-4 md:px-6 flex-1">

        <section className="mb-8 mt-4 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-primary p-8 md:p-12 text-white shadow-xl border-b-4 border-secondary/30">
            <div className="relative z-10 text-center md:text-left">
              <h1 className="font-display text-4xl md:text-6xl font-black mb-3 tracking-tight">
                Welcome to the Student Hub
              </h1>
              <p className="text-white/80 text-sm md:text-xl max-w-md font-medium">
                Official connection for Regiopolis-Notre Dame students.
              </p>
            </div>
            <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 -skew-x-12 translate-x-1/2"></div>
          </div>
        </section>

        {/* Live Today Banner */}
        <section className="mb-10 bg-card border border-border rounded-2xl p-6 shadow-sm animate-in zoom-in-95 duration-500">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Activity className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="font-display font-bold text-xl text-primary">Live Today</h2>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
                  {format(new Date(), 'EEEE, MMMM do')}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div 
                className="flex items-center gap-2 cursor-pointer group"
                onClick={() => setDressCode(prev => prev === "Full Uniform" ? "Spirit Theme" : "Full Uniform")}
              >
                <Badge 
                  className={cn(
                    "px-4 py-1.5 text-xs font-bold uppercase tracking-widest transition-all",
                    dressCode === "Full Uniform" 
                      ? "bg-[#800000] text-white hover:bg-[#600000]" 
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  )}
                >
                  <Shirt className="w-3 h-3 mr-2" />
                  {dressCode}
                </Badge>
                <span className="text-[10px] text-muted-foreground font-medium italic opacity-0 group-hover:opacity-100 transition-opacity">
                  Check Student Council announcements.
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-3 flex items-center gap-2">
              <Users className="w-4 h-4" /> Lunch Meetings
            </h3>
            {clubsLoading ? (
              <Skeleton className="h-4 w-full" />
            ) : todayClubs && todayClubs.length > 0 ? (
              <div className="relative overflow-hidden h-6 bg-primary/5 rounded-lg">
                <div className="absolute whitespace-nowrap animate-marquee flex items-center gap-8 px-4 h-full">
                  {todayClubs.map(club => (
                    <span key={club.id} className="text-sm font-bold text-primary">
                      • {club.name} ({club.location || "TBD"})
                    </span>
                  ))}
                  {todayClubs.map(club => (
                    <span key={`${club.id}-dup`} className="text-sm font-bold text-primary">
                      • {club.name} ({club.location || "TBD"})
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground italic">No meetings scheduled for today.</p>
            )}
          </div>
        </section>

        {!featuredLoading && filteredFeatured && filteredFeatured.length > 0 && (
          <div className="mb-10">
            <SectionHeader title="Spotlight" description="Featured highlights" />
            <FeaturedCarousel items={filteredFeatured} />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="md:col-span-2 space-y-10">
            {favoriteUpdates && favoriteUpdates.length > 0 && (
              <section className="animate-in">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display font-bold text-xl text-primary flex items-center gap-2">
                    <Star className="w-5 h-5 text-secondary fill-current" />
                    Your Team Updates
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {favoriteUpdates.map(update => (
                    <div key={update.id} className="bg-card border border-secondary/20 rounded-2xl p-4 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest px-2 py-1 bg-secondary/10 rounded-lg">
                          {update.sportName}
                        </span>
                        <span className="text-[10px] font-bold text-green-600 flex items-center gap-1 uppercase">
                          <Activity className="w-3 h-3" /> {update.type}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm mb-1">{update.title}</h4>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">
                        {format(new Date(update.date), 'MMMM d')} • {update.location || "TBD"}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section>
              <SectionHeader title="Daily Announcements" description="Stay in the loop" />
              <div className="grid gap-4 mt-4">
                {newsLoading ? (
                  <Skeleton className="h-32 w-full rounded-2xl" />
                ) : (
                  latestNews?.map((news) => (
                    <div key={news.id} className="bg-card rounded-2xl border border-border p-5 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{format(new Date(news.date), 'MMM d, yyyy')}</span>
                      </div>
                      <h3 className="font-bold text-lg mb-2">{news.title}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">{news.summary}</p>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>

          <aside className="space-y-8">
            <section className="bg-primary rounded-[2rem] p-6 text-white shadow-xl relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="font-display font-bold text-xl mb-1 flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-secondary" /> Today's Menu
                </h3>
                <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-4">
                  {format(new Date(), 'EEEE, MMM do')}
                </p>
                {menuLoading ? (
                  <Skeleton className="h-10 w-full bg-white/10" />
                ) : todayMenu ? (
                  <div className="space-y-2">
                    <p className="font-bold text-lg leading-tight">{todayMenu.title}</p>
                    <p className="text-white/70 text-xs line-clamp-2">{todayMenu.description}</p>
                  </div>
                ) : (
                  <p className="text-white/60 text-xs italic">Check back later for today's menu.</p>
                )}
                <Link href="/menu">
                  <button className="w-full mt-6 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl py-2 text-[10px] font-bold uppercase tracking-widest transition-colors">
                    View Full Menu
                  </button>
                </Link>
              </div>
            </section>

            <section className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <h3 className="font-display font-bold text-lg text-primary mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-secondary" /> Quick Links
              </h3>
              <div className="space-y-3">
                <Link href="/dates">
                  <Button variant="outline" className="w-full justify-start text-xs font-bold uppercase tracking-widest">
                    School Calendar
                  </Button>
                </Link>
              </div>
            </section>
          </aside>
        </div>
      </main>

      {/* 4. App Update Notice Footer */}
      <footer className="w-full bg-muted/50 border-t border-border py-4 px-6 mb-20 md:mb-0">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground flex items-center gap-2">
            <Activity className="w-3 h-3 text-primary animate-pulse" />
            📢 App Update Available: Please refresh or clear your cache to ensure you are seeing the latest schedules.
          </p>
        </div>
      </footer>
    </div>
  );
}