import { MobileHeader } from "@/components/Header";
import { SectionHeader } from "@/components/SectionHeader";
import { useAnnouncements } from "@/hooks/use-data";
import { format } from "date-fns";
import { Link, Route, Switch, useRoute } from "wouter";
import { ArrowLeft, CalendarDays } from "lucide-react";

function NewsList() {
  const { data: news, isLoading } = useAnnouncements();

  if (isLoading) return <div className="p-6 md:pt-32"><p className="text-center text-muted-foreground">Loading news...</p></div>;

  return (
    <div className="pb-24 md:pb-10">
      <MobileHeader title="Daily News" />
      
      <main className="md:pt-28 max-w-4xl mx-auto px-4 md:px-6">
        <SectionHeader title="Daily Announcements" description="Stay up to date with what's happening at RND." />

        <div className="grid gap-4">
          {news?.map((item, idx) => (
            <Link key={item.id} href={`/news/${item.id}`}>
              <article 
                className="bg-card p-5 md:p-6 rounded-xl border border-border/60 shadow-sm hover:shadow-md hover:border-primary/20 transition-all cursor-pointer group animate-in"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="flex flex-col md:flex-row gap-4 md:items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground mb-2">
                      <span className="bg-secondary/20 text-secondary-foreground px-2 py-0.5 rounded text-[10px] uppercase tracking-wide">
                        {item.source}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <CalendarDays className="w-3 h-3" />
                        {format(new Date(item.date), 'MMMM d, yyyy')}
                      </span>
                    </div>
                    
                    <h3 className="font-display font-bold text-lg md:text-xl text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm md:text-base mt-2 line-clamp-2">
                      {item.summary}
                    </p>
                  </div>
                  
                  {item.imageUrl && (
                    <div className="shrink-0 w-full md:w-32 aspect-video md:aspect-square rounded-lg overflow-hidden bg-muted">
                      <img src={item.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
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
  if (!item) return <div className="p-6 md:pt-32 text-center">Announcement not found</div>;

  return (
    <div className="pb-24 md:pb-10 bg-background min-h-screen">
       <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md border-b border-border/50 z-40 px-4 h-16 flex items-center md:hidden">
        <Link href="/news">
          <button className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
        </Link>
        <span className="ml-2 font-bold font-display text-lg">Article</span>
      </header>

      <main className="pt-20 md:pt-28 max-w-3xl mx-auto px-4 md:px-6">
        <Link href="/news" className="hidden md:inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to News
        </Link>

        <article className="animate-in">
          {item.imageUrl && (
            <div className="w-full aspect-video rounded-2xl overflow-hidden mb-8 shadow-md">
              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground mb-4">
            <span className="bg-secondary text-primary px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider">
              {item.source}
            </span>
            <span>{format(new Date(item.date), 'MMMM d, yyyy')}</span>
          </div>

          <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-primary mb-6 leading-tight">
            {item.title}
          </h1>

          <div className="prose prose-lg prose-neutral max-w-none prose-headings:font-display prose-headings:text-foreground prose-a:text-primary">
            <p className="lead text-xl text-muted-foreground mb-8 font-medium">
              {item.summary}
            </p>
            <div dangerouslySetInnerHTML={{ __html: item.content }} />
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
