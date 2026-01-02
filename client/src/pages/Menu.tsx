import { MobileHeader } from "@/components/Header";
import { SectionHeader } from "@/components/SectionHeader";
import { useMenu } from "@/hooks/use-data";
import { format, isSameDay, parseISO } from "date-fns";
import { Utensils } from "lucide-react";

export default function Menu() {
  const { data: menu, isLoading } = useMenu();

  const today = new Date();
  const todaysItems = menu?.filter(item => isSameDay(parseISO(item.date), today) && item.category === 'Main');

  if (isLoading) return <div className="p-6 md:pt-32"><p className="text-center text-muted-foreground text-sm font-bold uppercase tracking-widest">Loading menu...</p></div>;

  return (
    <div className="pb-24 md:pb-10 bg-background min-h-screen">
      <MobileHeader title="Food" />
      
      <main className="md:pt-28 max-w-2xl mx-auto px-4 md:px-6">
        <SectionHeader title="Today's Main Dish" description="Daily special served in the Student Commons." />

        <div className="space-y-6 animate-in">
          {todaysItems?.length ? (
            todaysItems.map((item) => (
              <div key={item.id} className="bg-card rounded-2xl p-6 border border-border shadow-sm flex flex-col gap-4 hover:border-primary/20 transition-all">
                <div className="flex items-center gap-3 text-primary">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <Utensils className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl">{item.title}</h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{item.location || "Student Commons"}</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                {item.price && (
                  <div className="pt-2 border-t border-border mt-2">
                    <span className="text-lg font-bold text-primary">{item.price}</span>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-16 bg-card rounded-2xl border border-dashed border-border">
              <Utensils className="w-12 h-12 text-muted/30 mx-auto mb-4" />
              <p className="text-muted-foreground font-bold uppercase tracking-widest text-sm">No main dish posted for today.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
