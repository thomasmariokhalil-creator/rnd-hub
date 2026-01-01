import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({ title, description, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-6", className)}>
      <h2 className="font-display font-bold text-2xl md:text-3xl text-primary">{title}</h2>
      {description && (
        <p className="text-muted-foreground mt-1 font-medium">{description}</p>
      )}
      <div className="h-1 w-12 bg-secondary rounded-full mt-3" />
    </div>
  );
}
