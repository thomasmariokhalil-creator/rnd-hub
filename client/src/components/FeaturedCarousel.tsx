import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { useFeatured } from '@/hooks/use-data';
import { Skeleton } from "@/components/ui/skeleton";

export function FeaturedCarousel() {
  const { data: featured, isLoading } = useFeatured();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  if (isLoading) {
    return (
      <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-muted animate-pulse rounded-none md:rounded-2xl" />
    );
  }

  if (!featured || featured.length === 0) return null;

  return (
    <div className="relative overflow-hidden group rounded-none md:rounded-2xl shadow-lg border-b border-border md:border">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {featured.map((item) => (
            <div key={item.id} className="relative flex-[0_0_100%] min-w-0">
              <div className="relative aspect-[16/9] md:aspect-[21/9] bg-primary flex items-center justify-center overflow-hidden">
                {/* As requested: no photos at this time, title removed from UI, keeping structure for easy future additions */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80 opacity-90" />
                <div className="relative z-10 p-10 text-center">
                  <div className="w-24 h-24 bg-secondary rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500">
                    <span className="text-primary font-black text-4xl font-display uppercase tracking-tighter">RND</span>
                  </div>
                  <div className="h-1 w-12 bg-secondary mx-auto rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
