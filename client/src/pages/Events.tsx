import { MobileHeader } from "@/components/Header";
import { SectionHeader } from "@/components/SectionHeader";
import { useEvents } from "@/hooks/use-data";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar, Clock, GraduationCap, PartyPopper, Zap } from "lucide-react";

export default function Events() {
  const { data: events, isLoading } = useEvents();

  if (isLoading) return <div className="p-6 md:pt-32 text-center font-bold uppercase tracking-widest text-muted-foreground">Loading schedules...</div>;

  const schedule = events?.filter(e => e.type === 'Schedule').sort((a, b) => a.title.localeCompare(b.title));
  const mass = events?.filter(e => e.type === 'Mass');
  const paDays = events?.filter(e => e.type === 'PA Day');
  const holidays = events?.filter(e => e.type === 'Holiday');
  const exams = events?.filter(e => e.type === 'Exams');

  return (
    <div className="pb-24 md:pb-10 bg-background min-h-screen">
      <MobileHeader title="Dates" />
      
      <main className="md:pt-28 max-w-4xl mx-auto px-4 md:px-6">
        <SectionHeader title="Schedules & Dates" description="Daily bells, mass times, and school breaks." />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Daily Schedule */}
          <div className="space-y-6">
            <h3 className="font-display font-bold text-xl flex items-center gap-2 text-primary">
              <Clock className="w-5 h-5 text-secondary" />
              Daily Schedule
            </h3>
            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden divide-y divide-border">
              {schedule?.map((item) => (
                <div key={item.id} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                  <span className="font-bold text-foreground uppercase tracking-tight text-sm">{item.title}</span>
                  <span className="font-display font-bold text-primary">{item.description}</span>
                </div>
              ))}
            </div>

            {mass && mass.length > 0 && (
              <div className="mt-8 space-y-4">
                <h3 className="font-display font-bold text-xl flex items-center gap-2 text-primary">
                  <Zap className="w-5 h-5 text-secondary" />
                  Mass Day Schedule
                </h3>
                {mass.map(m => (
                  <div key={m.id} className="bg-secondary/10 border border-secondary/30 rounded-xl p-4">
                    <h4 className="font-bold text-primary mb-1">{m.title}</h4>
                    <p className="text-xs font-bold uppercase tracking-widest text-primary/70 mb-2">{format(new Date(m.date), 'MMMM d, yyyy')}</p>
                    <p className="text-sm font-medium text-foreground/80 leading-relaxed">{m.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Important Dates */}
          <div className="space-y-10">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                PA Days
              </h3>
              <div className="space-y-3">
                {paDays?.map(day => (
                  <div key={day.id} className="flex items-center justify-between py-2 border-b border-border/50">
                    <span className="font-bold text-sm">{day.title}</span>
                    <span className="text-xs font-bold text-primary bg-primary/5 px-2 py-1 rounded uppercase">{format(new Date(day.date), 'MMM d')}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                <PartyPopper className="w-4 h-4" />
                Holidays
              </h3>
              <div className="space-y-3">
                {holidays?.map(day => (
                  <div key={day.id} className="flex items-center justify-between py-2 border-b border-border/50">
                    <span className="font-bold text-sm">{day.title}</span>
                    <span className="text-xs font-bold text-primary bg-primary/5 px-2 py-1 rounded uppercase">{format(new Date(day.date), 'MMM d')}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Exams
              </h3>
              <div className="space-y-3">
                {exams?.map(day => (
                  <div key={day.id} className="bg-primary/5 border border-primary/10 rounded-xl p-4">
                    <span className="font-bold text-primary block mb-1">{day.title}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{format(new Date(day.date), 'MMMM yyyy')}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
