import { useAnnouncements, useMenu, useFeatured, useSports } from "@/hooks/use-data";
import { FeaturedCarousel } from "@/components/FeaturedCarousel";
import { SectionHeader } from "@/components/SectionHeader";
import { MobileHeader } from "@/components/Header";
import { format } from "date-fns";
import { Utensils, Calendar, Star, Activity } from "lucide-react";
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

  // 1. FILTER: This removes any item titled "Welcome" from the spotlight database
  const filteredFeatured = featured?.filter(item => 
    !item.title.toLowerCase().includes("welcome") && 
    !item.title.toLowerCase().includes("student hub")
  );

  const favoriteUpdates = sports?.filter(s => favorites.includes(s.sportName))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 4);

  return (
    <div className="pb-24 md:pb-10 bg-background min-h-screen">
      <MobileHeader />

      <main className="md:pt-24 max-w-4xl mx-auto px-4 md:px-6">

        {/* 2. HERO: Fixed to be Text-Only (Logo image removed as requested) */}
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
            {/* Background pattern for texture */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 -skew-x-12 translate-x-1/2"></div>
          </div>
        </section>

        {/* 3. CAROUSEL: Now uses the "filteredFeatured" list to prevent double welcome */}
        {!featuredLoading && filteredFeatured && filteredFeatured.length > 0 && (
          <div className="mb-10">
            <SectionHeader title="Spotlight" description="Featured highlights" />
            <FeaturedCarousel items={filteredFeatured} />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-10">
            {/* Team Updates */}
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

            {/* News Section */}
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

          {/* Sidebar */}
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
                <Link href="/events">
                  <Button variant="outline" className="w-full justify-start text-xs font-bold uppercase tracking-widest">
                    School Calendar
                  </Button>
                </Link>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}