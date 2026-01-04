import { Link, useLocation } from "wouter";
import { Home, Newspaper, Utensils, Users, Trophy, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

import logoImage from "@assets/image_1767333029341.png";

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
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border/40 z-50 md:hidden pb-safe shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        <div className="flex justify-around items-center h-16 px-2">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive = location === href;
            return (
              <Link key={href} href={href}>
                <div className={cn(
                  "flex flex-col items-center justify-center w-full h-full px-1 py-1 space-y-1 transition-all cursor-pointer relative",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}>
                  <Icon className={cn("w-5 h-5", isActive ? "stroke-[2.5px]" : "stroke-[2px]")} />
                  <span className={cn("text-[10px] font-bold leading-none uppercase tracking-tighter", isActive ? "opacity-100" : "opacity-80")}>{label}</span>
                  {isActive && <div className="w-1 h-1 bg-secondary rounded-full absolute bottom-0" />}
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Desktop Top Navigation */}
      <header className="hidden md:block fixed top-0 left-0 right-0 bg-white text-foreground z-50 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer group">
              <img src={logoImage} alt="RND Hub Logo" className="w-10 h-10 rounded-lg shadow-md object-cover group-hover:scale-105 transition-transform" />
              <div>
                <h1 className="font-display font-bold text-xl leading-none text-primary">RND Hub</h1>
                <p className="text-xs text-muted-foreground font-medium">Regiopolis-Notre Dame</p>
              </div>
            </div>
          </Link>

          <nav className="flex items-center gap-1">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
              const isActive = location === href;
              return (
                <Link key={href} href={href}>
                  <div className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full transition-all cursor-pointer font-medium text-sm",
                    isActive 
                      ? "bg-secondary/20 text-primary font-bold shadow-sm border border-secondary/30" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
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
