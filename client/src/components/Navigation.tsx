import { Link, useLocation } from "wouter";
import { Home, Newspaper, Utensils, Users, Trophy, Calendar, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

import logoImage from "@assets/image_1767333029341.png";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/news", label: "News", icon: Newspaper },
  { href: "/menu", label: "Food", icon: Utensils },
  { href: "/clubs", label: "Clubs", icon: Users },
  { href: "/sports", label: "Sports", icon: Trophy },
  { href: "/events", label: "Dates", icon: Calendar },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="p-6">
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer group">
            <img src={logoImage} alt="RND Hub Logo" className="w-10 h-10 rounded-lg shadow-md object-cover group-hover:scale-105 transition-transform" />
            <div>
              <h1 className="font-display font-bold text-xl leading-none text-primary">RND Hub</h1>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-0.5">Regiopolis-Notre Dame</p>
            </div>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/70">Navigation</SidebarGroupLabel>
          <SidebarGroupContent className="px-4">
            <SidebarMenu>
              {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
                const isActive = location === href;
                return (
                  <SidebarMenuItem key={href}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={label} className="py-6 rounded-xl transition-all duration-200">
                      <Link href={href}>
                        <div className={cn(
                          "flex items-center gap-3 w-full",
                          isActive ? "text-primary font-bold" : "text-muted-foreground"
                        )}>
                          <Icon className={cn("w-5 h-5", isActive && "stroke-[2.5px]")} />
                          <span className="text-sm">{label}</span>
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export function Navigation() {
  const [location] = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border/50 z-50 md:hidden pb-safe">
      <div className="flex justify-around items-center h-16 px-2">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = location === href;
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
  );
}
