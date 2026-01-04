import { useAnnouncements, useMenu, useFeatured, useSports } from "@/hooks/use-data";
import { FeaturedCarousel } from "@/components/FeaturedCarousel";
import { SectionHeader } from "@/components/SectionHeader";
import { MobileHeader } from "@/components/Header";
import { format } from "date-fns";
import { Utensils, Calendar, ArrowRight, Star, MapPin, Activity } from "lucide-react";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function Home() {
  const { data: announcements, isLoading: newsLoading } = useAnnouncements();
  const { data: menuItems, isLoading: menuLoading } = useMenu();
  const { data: featured, isLoading: featuredLoading } = useFeatured();
  const { data: sports, isLoading: sportsLoading } = useSports();
  
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("favoriteSports");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const todayMenu = menuItems?.find(item => item.date === new Date().toISOString().split('T')[0]);
  const latestNews = announcements?.slice(0, 3);
  
  const favoriteUpdates = sports?.filter(s => favorites.includes(s.sportName))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 4);

  return (
    <div className="pb-24 md:pb-10 bg-background min-h-screen">
      <MobileHeader />
      
      <main className="pt-6 md:pt-32 max-w-7xl mx-auto px-4 md:px-6">
        {featuredLoading ? (
          <Skeleton className="w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl mb-8" />
        ) : (
          featured && <FeaturedCarousel items={featured} />
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="md:col-span-2 space-y-12">
            {/* Prominent Sports Updates for Favorites */}
            {favoriteUpdates && favoriteUpdates.length > 0 && (
              <section className="animate-in">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display font-bold text-xl text-primary flex items-center gap-2">
                    <Star className="w-5 h-5 text-secondary fill-current" />
                    Your Team Updates
                  </h2>
                  <Link href="/sports">
                    <Button variant="ghost" size="sm" className="text-xs font-bold uppercase tracking-widest">
                      View All <ArrowRight className="ml-1 w-3 h-3" />
                    </Button>
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {favoriteUpdates.map(update => (
                    <div key={update.id} className="bg-card border border-secondary/30 rounded-xl p-4 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[9px] font-bold text-primary uppercase tracking-[0.2em] px-2 py-0.5 bg-secondary/20 rounded-full">
                          {update.sportName}
                        </span>
                        <span className="text-[10px] font-bold text-green-600 flex items-center gap-1">
                          <Activity className="w-3 h-3" /> {update.type}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm mb-1 line-clamp-1">{update.title}</h4>
                      <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-bold uppercase">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {format(new Date(update.date), 'MMM d')}</span>
                        {update.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {update.location}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section>
              <div className="flex items-center justify-between mb-6">
                <SectionHeader title="Latest Announcements" description="Stay informed with daily school news." className="mb-0" />
                <Link href="/news" className="text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-1 hover:underline">
                  All News <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              
              <div className="grid gap-4">
                {newsLoading ? (
                  [1, 2, 3].map(i => <Skeleton key={i} className="h-32 w-full rounded-xl" />)
                ) : (
                  latestNews?.map((news) => (
                    <div key={news.id} className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-all cursor-pointer">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold text-primary/70 uppercase tracking-widest px-2 py-0.5 bg-primary/5 rounded-full">{format(new Date(news.date), 'MMMM d, yyyy')}</span>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{news.source}</span>
                      </div>
                      <h3 className="font-display font-bold text-xl mb-2 text-foreground group-hover:text-primary transition-colors">{news.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{news.summary}</p>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>

          <aside className="space-y-8">
            <section className="bg-primary rounded-2xl p-8 text-white shadow-xl relative overflow-hidden group hover:shadow-primary/20 transition-all border border-white/5">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform rotate-12">
                <Utensils className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <h3 className="font-display font-bold text-2xl mb-1 uppercase tracking-tight">Today's Menu</h3>
                <p className="text-white/60 text-[11px] font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-4">{format(new Date(), 'EEEE, MMMM do')}</p>
                
                {menuLoading ? (
                  <Skeleton className="h-10 w-full bg-white/20" />
                ) : todayMenu ? (
                  <div className="space-y-4">
                    <div>
                      <p className="font-bold text-xl leading-tight text-secondary-foreground">{todayMenu.title}</p>
                      <p className="text-white/80 text-sm mt-2 leading-relaxed">{todayMenu.description}</p>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                      <span className="text-xs font-bold uppercase tracking-widest opacity-80 flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
                        <MapPin className="w-3.5 h-3.5" /> {todayMenu.location || "Commons"}
                      </span>
                      <span className="font-display font-black text-2xl text-secondary">{todayMenu.price}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-white/60 text-sm italic">No menu items listed for today.</p>
                )}
                
                <Link href="/menu">
                  <button className="w-full mt-8 bg-secondary text-primary hover:bg-secondary/90 rounded-xl py-3 text-xs font-bold uppercase tracking-[0.2em] transition-all shadow-lg active:scale-[0.98]">
                    View Full Menu
                  </button>
                </Link>
              </div>
            </section>
            
            <section className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <h3 className="font-display font-bold text-lg text-primary mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-secondary" />
                Upcoming Events
              </h3>
              <div className="space-y-4">
                <p className="text-xs text-muted-foreground italic uppercase tracking-widest">Check the full schedule for P.A. Days and holidays.</p>
                <Link href="/events">
                  <button className="w-full bg-secondary/10 hover:bg-secondary/20 text-primary border border-secondary/20 rounded-xl py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors">
                    School Calendar
                  </button>
                </Link>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}
