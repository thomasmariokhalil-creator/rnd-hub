import { MobileHeader } from "@/components/Header";
import { SectionHeader } from "@/components/SectionHeader";
import { useMenu } from "@/hooks/use-data";
import { format, isSameDay, parseISO } from "date-fns";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Menu() {
  const { data: menu, isLoading } = useMenu();
  const [activeTab, setActiveTab] = useState("today");

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const todaysItems = menu?.filter(item => isSameDay(parseISO(item.date), today));
  const tomorrowsItems = menu?.filter(item => isSameDay(parseISO(item.date), tomorrow));
  
  // Group by category
  const groupByCategory = (items: typeof menu) => {
    if (!items) return {};
    return items.reduce((acc, item) => {
      const cat = item.category || 'Other';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(item);
      return acc;
    }, {} as Record<string, typeof items>);
  };

  const todayGrouped = groupByCategory(todaysItems);
  const tomorrowGrouped = groupByCategory(tomorrowsItems);

  if (isLoading) return <div className="p-6 md:pt-32"><p className="text-center text-muted-foreground">Loading menu...</p></div>;

  return (
    <div className="pb-24 md:pb-10">
      <MobileHeader title="Cafeteria Menu" />
      
      <main className="md:pt-28 max-w-4xl mx-auto px-4 md:px-6">
        <SectionHeader title="What's for Lunch?" description="Daily specials and cafeteria offerings." />

        <Tabs defaultValue="today" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 bg-muted/50 p-1 rounded-xl mb-6">
            <TabsTrigger value="today" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm font-bold">
              Today ({format(today, 'EEE')})
            </TabsTrigger>
            <TabsTrigger value="tomorrow" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm font-bold">
              Tomorrow ({format(tomorrow, 'EEE')})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-8 animate-in">
            <MenuDayView groupedItems={todayGrouped} isEmpty={!todaysItems?.length} />
          </TabsContent>

          <TabsContent value="tomorrow" className="space-y-8 animate-in">
             <MenuDayView groupedItems={tomorrowGrouped} isEmpty={!tomorrowsItems?.length} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function MenuDayView({ groupedItems, isEmpty }: { groupedItems: any, isEmpty: boolean }) {
  if (isEmpty) {
    return (
      <div className="text-center py-12 bg-muted/30 rounded-2xl border border-dashed border-border">
        <p className="text-muted-foreground font-medium">No menu items posted for this day.</p>
      </div>
    );
  }

  return (
    <>
      {Object.entries(groupedItems).map(([category, items]: [string, any]) => (
        <div key={category}>
          <h3 className="font-display font-bold text-xl text-foreground mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary" />
            {category}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item: any) => (
              <div key={item.id} className="bg-card rounded-xl p-4 border border-border/60 shadow-sm flex gap-4 hover:border-primary/30 transition-colors">
                {item.imageUrl && (
                  <img src={item.imageUrl} alt={item.title} className="w-24 h-24 rounded-lg object-cover bg-muted shrink-0" />
                )}
                <div className="flex-1">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-bold text-lg leading-tight">{item.title}</h4>
                    {item.price && <span className="text-sm font-bold text-primary bg-secondary/10 px-2 py-0.5 rounded">{item.price}</span>}
                  </div>
                  <p className="text-muted-foreground text-sm mt-1.5">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
