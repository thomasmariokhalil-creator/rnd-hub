import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { useFeatured } from '@/hooks/use-data';
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from 'lucide-react';

export function FeaturedCarousel() {
  const { data: featured, isLoading } = useFeatured();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (isLoading) {
    return (
      <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-muted animate-pulse rounded-none md:rounded-2xl" />
    );
  }

  if (!featured || featured.length === 0) return null;

  return (
    <div className="relative overflow-hidden group rounded-none md:rounded-2xl shadow-xl">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {featured.map((item) => (
            <div key={item.id} className="relative flex-[0_0_100%] min-w-0">
              <div className="relative aspect-[16/9] md:aspect-[21/9]">
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
                  <h2 className="font-display font-bold text-2xl md:text-4xl mb-2 drop-shadow-md">
                    {item.title}
                  </h2>
                  {item.linkUrl && (
                    <button className="flex items-center gap-1 text-sm font-semibold bg-secondary text-primary px-4 py-2 rounded-full mt-2 hover:bg-white transition-colors">
                      Learn More <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
