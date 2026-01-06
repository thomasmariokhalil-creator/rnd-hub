import { Link, useLocation } from "wouter";
import { Home, Newspaper, Utensils, Users, Trophy, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const logoImage = "/attached_assets/school_logo.png";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/news", label: "News", icon: Newspaper },
  { href: "/menu", label: "Food", icon: Utensils },
  { href: "/clubs", label: "Clubs", icon: Users },
  { href: "/sports", label: "Sports", icon: Trophy },
  { href: "/events", label: "Dates", icon: Calendar },
];

export function Navigation() {
  const [location] = useLocation();

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border/50 z-50 md:hidden pb-safe">
        <div className="flex justify-around items-center h-16 px-2">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive = location === href || (location === "" && href === "/");

            return (
              <Link key={href} href={href}>
                <div className={cn(
                  "flex flex-col items-center justify-center w-full h-full px-1 py-1 space-y-1 transition-colors cursor-pointer",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}>
                  <Icon className={cn("w-5 h-5", isActive && "stroke-[2.5px]")} />
                  <span className="text-[10px] font-medium leading-none">{label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Desktop Top Navigation */}
      <header className="hidden md:block fixed top-0 left-0 right-0 bg-primary text-primary-foreground z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer group">
              <img 
                src={logoImage} 
                alt="RND Hub Logo" 
                className="w-10 h-10 rounded-lg shadow-md object-contain bg-white p-0.5 group-hover:scale-105 transition-transform" 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  // Final check: if the relative path failed, try the absolute path just in case
                  if (!target.src.includes('/attached_assets/')) {
                    target.src = "/attached_assets/school_logo.png";
                  } else {
                    // Fail-safe to keep the UI clean
                    target.style.display = 'none';
                  }
                }}
              />
              <div>
                <h1 className="font-display font-bold text-xl leading-none">RND Hub</h1>
                <p className="text-xs text-primary-foreground/80 font-medium uppercase tracking-tight">Regiopolis-Notre Dame</p>
              </div>
            </div>
          </Link>

          <nav className="flex items-center gap-1">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
              const isActive = location === href || (location === "" && href === "/");
              return (
                <Link key={href} href={href}>
                  <div className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full transition-all cursor-pointer font-medium text-sm",
                    isActive 
                      ? "bg-secondary text-primary font-bold shadow-sm" 
                      : "text-primary-foreground/90 hover:bg-primary-foreground/10"
                  )}>
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
    </>
  );
}