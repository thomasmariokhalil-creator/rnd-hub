import { FeaturedCarousel } from "@/components/FeaturedCarousel";
import { MobileHeader } from "@/components/Header";
import { useAnnouncements, useMenu, useSports } from "@/hooks/use-data";
import { Link } from "wouter";
import { format } from "date-fns";
import { ChevronRight, Newspaper, Utensils, Trophy } from "lucide-react";

export default function Home() {
  const { data: news } = useAnnouncements();
  const { data: menu } = useMenu();
  const { data: sports } = useSports();

  const today = format(new Date(), 'yyyy-MM-dd');
  const todaysLunch = menu?.find(m => m.date === today && m.category === 'Main');
  const latestNews = news?.slice(0, 3);
  const upcomingGame = sports?.find(s => !s.result);

  return (
    <div className="pb-24 md:pb-10">
      <MobileHeader subtitle="Welcome Back, Panther!" />
      
      <main className="md:pt-28 max-w-7xl mx-auto px-0 md:px-6">
        <FeaturedCarousel />

        <div className="px-4 md:px-0 mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Today's Lunch Card */}
          <section className="bg-card rounded-2xl border border-border/60 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="bg-secondary/10 p-4 flex items-center justify-between border-b border-secondary/20">
              <div className="flex items-center gap-2 text-primary font-bold font-display">
                <Utensils className="w-5 h-5" />
                <h3>Today's Lunch</h3>
              </div>
              <Link href="/menu" className="text-xs font-bold text-primary hover:underline">View Menu</Link>
            </div>
            <div className="p-5">
              {todaysLunch ? (
                <div className="flex gap-4">
                  {todaysLunch.imageUrl && (
                    <img 
                      src={todaysLunch.imageUrl} 
                      alt={todaysLunch.title}
                      className="w-20 h-20 rounded-lg object-cover bg-muted"
                    />
                  )}
                  <div>
                    <h4 className="font-bold text-lg leading-tight">{todaysLunch.title}</h4>
                    <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{todaysLunch.description}</p>
                    {todaysLunch.price && (
                      <span className="inline-block mt-2 text-sm font-bold text-primary bg-primary/5 px-2 py-1 rounded">
                        {todaysLunch.price}
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground text-sm">
                  Check the full menu for details.
                </div>
              )}
            </div>
          </section>

          {/* Latest News Card */}
          <section className="bg-card rounded-2xl border border-border/60 shadow-sm overflow-hidden hover:shadow-md transition-shadow md:row-span-2">
            <div className="bg-primary/5 p-4 flex items-center justify-between border-b border-primary/10">
              <div className="flex items-center gap-2 text-primary font-bold font-display">
                <Newspaper className="w-5 h-5" />
                <h3>Latest News</h3>
              </div>
              <Link href="/news" className="text-xs font-bold text-primary hover:underline">View All</Link>
            </div>
            <div className="divide-y divide-border/50">
              {latestNews?.map((item) => (
                <Link key={item.id} href={`/news/${item.id}`}>
                  <div className="p-5 hover:bg-muted/50 transition-colors cursor-pointer group">
                    <span className="text-[10px] font-bold text-secondary-foreground/60 uppercase tracking-wider">
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
          <section className="bg-card rounded-2xl border border-border/60 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="bg-secondary p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-primary font-bold font-display">
                <Trophy className="w-5 h-5" />
                <h3>Next Game</h3>
              </div>
              <Link href="/sports" className="text-xs font-bold text-primary hover:underline">Sports Center</Link>
            </div>
            <div className="p-5">
              {upcomingGame ? (
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-3">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-lg leading-tight">{upcomingGame.title}</h4>
                  <div className="mt-3 flex items-center justify-center gap-2 text-sm text-muted-foreground font-medium">
                    <span>{format(new Date(upcomingGame.date), 'EEE, MMM d')}</span>
                    <span>•</span>
                    <span>{upcomingGame.location || "Home"}</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground text-sm">
                  No upcoming games scheduled.
                </div>
              )}
            </div>
          </section>
        
        </div>
      </main>
    </div>
  );
}
