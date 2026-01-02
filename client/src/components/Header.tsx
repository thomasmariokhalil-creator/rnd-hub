import { Link } from "wouter";
import logoImage from "@assets/image_1767329180834.png";

export function MobileHeader({ title, subtitle }: { title?: string, subtitle?: string }) {
  return (
    <header className="md:hidden sticky top-0 bg-primary text-primary-foreground z-40 px-6 py-4 shadow-lg border-b border-white/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/">
            <img src={logoImage} alt="RND Hub Logo" className="w-10 h-10 rounded-lg shadow-sm" />
          </Link>
          <div>
            <Link href="/">
              <h1 className="font-display font-bold text-xl cursor-pointer tracking-tight">
                {title || "RND Hub"}
              </h1>
            </Link>
            {subtitle && (
              <p className="text-[10px] text-primary-foreground/70 font-bold uppercase tracking-widest mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>
        <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center shadow-inner">
          <span className="text-primary font-bold font-display text-xs">RND</span>
        </div>
      </div>
    </header>
  );
}
