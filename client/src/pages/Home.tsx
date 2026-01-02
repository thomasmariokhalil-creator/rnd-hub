import { FeaturedCarousel } from "@/components/FeaturedCarousel";
import { MobileHeader } from "@/components/Header";
import { useAnnouncements, useMenu, useSports } from "@/hooks/use-data";
import { Link } from "wouter";
import { format } from "date-fns";
import { Newspaper, Utensils, Trophy, Calendar } from "lucide-react";

export default function Home() {
  const { data: news } = useAnnouncements();
  const { data: menu } = useMenu();
  const { data: sports } = useSports();

  const todayStr = format(new Date(), 'yyyy-MM-dd');
  const todaysLunch = menu?.find(m => m.date === todayStr && m.category === 'Main');
  const latestNews = news?.slice(0, 3);
  const upcomingGame = sports?.find(s => !s.result && !s.isTryout);

  return (
    <div className="pb-24 md:pb-10 bg-background min-h-screen">
      <MobileHeader subtitle="Welcome Back!" />
      
      <main className="md:pt-28 max-w-7xl mx-auto px-0 md:px-6">
        <FeaturedCarousel />

        <div className="px-4 md:px-0 mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Today's Lunch Card */}
          <section className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-all">
            <div className="bg-secondary p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-primary font-bold font-display">
                <Utensils className="w-5 h-5" />
                <h3 className="uppercase tracking-wide text-sm">Today's Lunch</h3>
              </div>
              <Link href="/menu" className="text-[10px] font-bold text-primary bg-white/50 px-2 py-1 rounded-full uppercase tracking-wider">Full Menu</Link>
            </div>
            <div className="p-5">
              {todaysLunch ? (
                <div>
                  <h4 className="font-bold text-lg leading-tight text-foreground">{todaysLunch.title}</h4>
                  <p className="text-muted-foreground text-sm mt-1">{todaysLunch.description}</p>
                  {todaysLunch.location && (
                    <div className="mt-3 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <p className="text-xs font-bold text-primary uppercase tracking-tight">{todaysLunch.location}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground text-sm">
                  Check the full menu for details.
                </div>
              )}
            </div>
          </section>

          {/* Latest News Card */}
          <section className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-all md:row-span-2">
            <div className="bg-primary p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-primary-foreground font-bold font-display">
                <Newspaper className="w-5 h-5" />
                <h3 className="uppercase tracking-wide text-sm">Latest News</h3>
              </div>
              <Link href="/news" className="text-[10px] font-bold text-primary bg-secondary px-2 py-1 rounded-full uppercase tracking-wider">View All</Link>
            </div>
            <div className="divide-y divide-border/50">
              {latestNews?.map((item) => (
                <Link key={item.id} href={`/news/${item.id}`}>
                  <div className="p-5 hover:bg-muted/50 transition-colors cursor-pointer group">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                      {format(new Date(item.date), 'MMM d, yyyy')}
                    </span>
                    <h4 className="font-bold text-base mt-1 group-hover:text-primary transition-colors line-clamp-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {item.summary}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Next Game Card */}
          <section className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-all">
            <div className="bg-secondary p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-primary font-bold font-display">
                <Trophy className="w-5 h-5" />
                <h3 className="uppercase tracking-wide text-sm">Next Game</h3>
              </div>
              <Link href="/sports" className="text-[10px] font-bold text-primary bg-white/50 px-2 py-1 rounded-full uppercase tracking-wider">Sports</Link>
            </div>
            <div className="p-5">
              {upcomingGame ? (
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-3">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-lg leading-tight">{upcomingGame.title}</h4>
                  <div className="mt-3 flex items-center justify-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    <span>{format(new Date(upcomingGame.date), 'EEE, MMM d')}</span>
                    <span>•</span>
                    <span>{upcomingGame.location || "Home"}</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground text-sm">
                  No games today. Check Athletics.
                </div>
              )}
            </div>
          </section>
        
        </div>
      </main>
    </div>
  );
}
