import { MobileHeader } from "@/components/Header";
import { SectionHeader } from "@/components/SectionHeader";
import { useClubs } from "@/hooks/use-data";
import { Mail, MapPin, Clock } from "lucide-react";

export default function Clubs() {
  const { data: clubs, isLoading } = useClubs();

  if (isLoading) return <div className="p-6 md:pt-32"><p className="text-center text-muted-foreground">Loading clubs...</p></div>;

  return (
    <div className="pb-24 md:pb-10">
      <MobileHeader title="Clubs & Activities" />
      
      <main className="md:pt-28 max-w-6xl mx-auto px-4 md:px-6">
        <SectionHeader title="Get Involved" description="Discover clubs and activities to join at RND." />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs?.map((club, idx) => (
            <div 
              key={club.id} 
              className="bg-card rounded-2xl overflow-hidden border border-border/60 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full animate-in"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="aspect-[3/2] bg-muted relative">
                {club.imageUrl ? (
                  <img src={club.imageUrl} alt={club.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/5 text-primary/20 font-display font-bold text-4xl">
                    RND
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-0 left-0 p-4 text-white font-display font-bold text-2xl drop-shadow-md">
                  {club.name}
                </h3>
              </div>
              
              <div className="p-5 flex flex-col flex-1">
                <p className="text-muted-foreground mb-6 line-clamp-3 text-sm leading-relaxed">
                  {club.description}
                </p>
                
                <div className="mt-auto space-y-2.5">
                  {club.meetingTime && (
                    <div className="flex items-center gap-2.5 text-sm text-foreground/80 font-medium">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{club.meetingTime}</span>
                    </div>
                  )}
                  {club.location && (
                    <div className="flex items-center gap-2.5 text-sm text-foreground/80 font-medium">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{club.location}</span>
                    </div>
                  )}
                  {club.contactEmail && (
                    <div className="pt-2 border-t border-border mt-3">
                      <a href={`mailto:${club.contactEmail}`} className="flex items-center gap-2 text-sm text-primary font-bold hover:underline">
                        <Mail className="w-4 h-4" />
                        Contact Leader
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
