import React from "react";
import { MobileHeader } from "@/components/Header";
import { SectionHeader } from "@/components/SectionHeader";
import { Calendar, Clock, MapPin, Users, Hash } from "lucide-react";

export default function Clubs() {
  const clubSchedule = [
    // Monday
    { name: "Band Council", time: "Lunch", room: "123", frequency: "Weekly", day: "Monday" },
    { name: "French Club", time: "Lunch", room: "212/216", frequency: "Weekly", day: "Monday" },
    { name: "Futsal Club", time: "Lunch", room: "JUC Gym", frequency: "Weekly", day: "Monday" },
    { name: "Sr. Band", time: "2:45-4:00", room: "123", frequency: "Weekly", day: "Monday" },
    // Tuesday
    { name: "Dance Club", time: "Lunch", room: "Commons/Caf", frequency: "Weekly", day: "Tuesday" },
    { name: "Gr. 11 Mathletes", time: "Lunch", room: "233", frequency: "Weekly", day: "Tuesday" },
    { name: "Chess Club", time: "Lunch", room: "114", frequency: "Weekly", day: "Tuesday" },
    { name: "Musical", time: "2:45-4:00", room: "123/Caf", frequency: "Weekly", day: "Tuesday" },
    // Wednesday
    { name: "Mental Health", time: "Lunch", room: "Learning Commons", frequency: "Weekly", day: "Wednesday" },
    { name: "DND Club", time: "Lunch", room: "Chaplain Room", frequency: "Weekly", day: "Wednesday" },
    { name: "Chess Club", time: "Lunch", room: "114", frequency: "Weekly", day: "Wednesday" },
    { name: "Musical", time: "2:45-4:00", room: "123/Caf", frequency: "Weekly", day: "Wednesday" },
    // Thursday
    { name: "Gr. 10/12 Mathletes", time: "Lunch", room: "231", frequency: "Weekly", day: "Thursday" },
    { name: "Gr. 9 Mathletes", time: "Lunch", room: "234", frequency: "Weekly", day: "Thursday" },
    { name: "Chess Club", time: "Lunch", room: "114", frequency: "Weekly", day: "Thursday" },
    { name: "Musical", time: "2:45-4:00", room: "123/Caf", frequency: "Weekly", day: "Thursday" },
    // Friday
    { name: "Jr. Band", time: "Lunch", room: "123", frequency: "Weekly", day: "Friday" },
    { name: "Futsal Club", time: "Lunch", room: "JUC Gym", frequency: "Weekly", day: "Friday" },
    { name: "Chess Club", time: "Lunch", room: "114", frequency: "Weekly", day: "Friday" },
    { name: "Musical", time: "2:45-4:00", room: "123/Caf", frequency: "Weekly", day: "Friday" },
    // Other
    { name: "Jazz Band", time: "Lunch", room: "123", frequency: "Weekly", day: "Friday" },
    { name: "French Club", time: "Lunch", room: "212/216", frequency: "Weekly", day: "Friday" },
    { name: "Pit Band", time: "2:45-4:00", room: "123", frequency: "Weekly", day: "Friday" },
    { name: "Improv", time: "2:45-4:00", room: "Drama Room", frequency: "Weekly", day: "Friday" },
    // Monthly
    { name: "Multicultural Club", time: "Monthly", room: "101/Learning Commons", frequency: "Monthly", day: "Various" },
    { name: "Computer Science", time: "Monthly", room: "238", frequency: "Monthly", day: "Various" },
  ];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Various"];

  return (
    <div className="pb-24 md:pb-10">
      <MobileHeader title="Get Involved" />
      
      <main className="md:pt-28 max-w-6xl mx-auto px-4 md:px-6">
        <SectionHeader title="Get Involved" description="Discover clubs and activities." />

        {days.map((day) => {
          const dayClubs = clubSchedule.filter(c => c.day === day);
          if (dayClubs.length === 0) return null;

          return (
            <div key={day} className="mb-12">
              <h2 className="text-2xl font-display font-bold text-[#800000] mb-6 flex items-center gap-3">
                <span className="w-8 h-1 bg-primary rounded-full" />
                {day}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dayClubs.map((club, idx) => (
                  <div 
                    key={`${club.name}-${idx}`} 
                    className="bg-card rounded-xl border border-border/60 p-4 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-4 animate-in"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-bold text-lg text-foreground truncate">
                          {club.name}
                        </h3>
                        {club.frequency === "Monthly" && (
                          <span className="text-[8px] font-black bg-secondary/20 text-primary px-1.5 py-0.5 rounded uppercase shrink-0">
                            Monthly
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-1 gap-1 mt-1">
                        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-bold uppercase tracking-tight">
                          <Clock className="w-3 h-3" />
                          <span>{club.time}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-bold uppercase tracking-tight">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate">Room: {club.room}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}
