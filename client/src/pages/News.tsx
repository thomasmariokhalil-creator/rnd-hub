import { MobileHeader } from "@/components/Header";
import { SectionHeader } from "@/components/SectionHeader";
import { useAnnouncements } from "@/hooks/use-data";
import { format } from "date-fns";
import { Link, Route, Switch } from "wouter";
import { ArrowLeft, CalendarDays, Newspaper } from "lucide-react";

function NewsList() {
  const { data: news, isLoading } = useAnnouncements();

  if (isLoading) return <div className="p-6 md:pt-32 text-center font-bold uppercase tracking-widest text-muted-foreground">Loading news...</div>;

  const todayStr = format(new Date(), 'EEEE, MMMM d, yyyy');

  return (
    <div className="pb-24 md:pb-10 bg-background min-h-screen">
      <MobileHeader title="Daily News" />
      
      <main className="md:pt-28 max-w-4xl mx-auto px-4 md:px-6">
        <div className="mb-8 animate-in">
          <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-1">Today's Date</p>
          <h2 className="text-2xl font-display font-black text-foreground uppercase tracking-tight">{todayStr}</h2>
        </div>

        <SectionHeader title="Announcements" description="Stay up to date with RND life." />

        <div className="grid gap-4">
          {news?.map((item, idx) => (
            <Link key={item.id} href={`/news/${item.id}`}>
              <article 
                className="bg-card p-5 rounded-2xl border border-border shadow-sm hover:shadow-md hover:border-primary/20 transition-all cursor-pointer group animate-in"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest mb-2">
                      <span className="bg-secondary px-2 py-0.5 rounded text-primary">
                        {item.source}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <CalendarDays className="w-3 h-3" />
                        {format(new Date(item.date), 'MMM d')}
                      </span>
                    </div>
                    
                    <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors leading-snug">
                      {item.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm mt-2 line-clamp-2 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

function NewsDetail({ params }: { params: { id: string } }) {
  const { data: news, isLoading } = useAnnouncements();
  const item = news?.find(n => n.id === parseInt(params.id));

  if (isLoading) return null;
  if (!item) return <div className="p-6 md:pt-32 text-center uppercase font-bold tracking-widest">Article not found</div>;

  return (
    <div className="pb-24 md:pb-10 bg-background min-h-screen">
       <header className="fixed top-0 left-0 right-0 bg-primary text-white z-40 px-4 h-16 flex items-center md:hidden shadow-lg">
        <Link href="/news">
          <button className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
        </Link>
        <span className="ml-2 font-bold font-display text-lg tracking-tight uppercase">Announcement</span>
      </header>

      <main className="pt-20 md:pt-28 max-w-2xl mx-auto px-4 md:px-6">
        <Link href="/news" className="hidden md:inline-flex items-center text-xs font-bold text-muted-foreground hover:text-primary mb-8 transition-colors uppercase tracking-widest">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to News
        </Link>

        <article className="animate-in">
          <div className="flex items-center gap-3 text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-6">
            <span className="bg-secondary px-3 py-1 rounded-full">
              {item.source}
            </span>
            <span>{format(new Date(item.date), 'MMMM d, yyyy')}</span>
          </div>

          <h1 className="font-display font-black text-3xl md:text-5xl text-foreground mb-8 leading-[1.1] uppercase tracking-tighter">
            {item.title}
          </h1>

          <div className="prose prose-neutral max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-strong:text-foreground">
            <p className="text-xl text-foreground font-bold mb-10 leading-relaxed border-l-4 border-secondary pl-6">
              {item.summary}
            </p>
            <div className="text-lg" dangerouslySetInnerHTML={{ __html: item.content }} />
          </div>
        </article>
      </main>
    </div>
  );
}

export default function News() {
  return (
    <Switch>
      <Route path="/news" component={NewsList} />
      <Route path="/news/:id" component={NewsDetail} />
    </Switch>
  );
}
