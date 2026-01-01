import { Link } from "wouter";

export function MobileHeader({ title, subtitle }: { title?: string, subtitle?: string }) {
  return (
    <header className="md:hidden sticky top-0 bg-primary text-primary-foreground z-40 px-6 py-5 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/">
            <h1 className="font-display font-bold text-xl cursor-pointer">
              {title || "RND Student Hub"}
            </h1>
          </Link>
          {subtitle && (
            <p className="text-xs text-primary-foreground/80 font-medium mt-0.5">{subtitle}</p>
          )}
        </div>
        <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center shadow-sm">
          <span className="text-primary font-bold font-display">R</span>
        </div>
      </div>
    </header>
  );
}
