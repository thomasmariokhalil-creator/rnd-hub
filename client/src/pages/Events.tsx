import { MobileHeader } from "@/components/Header";
import { SectionHeader } from "@/components/SectionHeader";
import { useEvents } from "@/hooks/use-data";
import { format, isSameMonth } from "date-fns";
import { cn } from "@/lib/utils";

export default function Events() {
  const { data: events, isLoading } = useEvents();

  if (isLoading) return <div className="p-6 md:pt-32"><p className="text-center text-muted-foreground">Loading calendar...</p></div>;

  const sortedEvents = events?.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) || [];

  return (
    <div className="pb-24 md:pb-10">
      <MobileHeader title="Important Dates" />
      
      <main className="md:pt-28 max-w-4xl mx-auto px-4 md:px-6">
        <SectionHeader title="School Calendar" description="Exams, holidays, and special schedules." />

        <div className="relative border-l-2 border-border ml-3 md:ml-6 space-y-10 py-4">
          {sortedEvents.map((event, idx) => {
            const date = new Date(event.date);
            const isHoliday = event.type === 'Holiday';
            const isExam = event.type === 'Exam';

            return (
              <div key={event.id} className="relative pl-8 md:pl-10 animate-in" style={{ animationDelay: `${idx * 50}ms` }}>
                {/* Timeline Dot */}
                <div className={cn(
                  "absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-background shadow-sm",
                  isHoliday ? "bg-green-500" : isExam ? "bg-red-500" : "bg-secondary"
                )} />

                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-6 mb-2">
                  <span className="text-sm font-bold text-primary bg-primary/5 px-2 py-0.5 rounded w-fit">
                    {format(date, 'MMMM d, yyyy')}
                  </span>
                  <span className={cn(
                    "text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded w-fit",
                    isHoliday ? "bg-green-100 text-green-800" : 
                    isExam ? "bg-red-100 text-red-800" : 
                    "bg-gray-100 text-gray-800"
                  )}>
                    {event.type}
                  </span>
                </div>

                <div className="bg-card p-5 rounded-xl border border-border/60 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-display font-bold text-lg text-foreground">{event.title}</h3>
                  {event.description && (
                    <p className="text-muted-foreground text-sm mt-2">{event.description}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
