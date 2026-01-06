import { Link } from "wouter";

export function MobileHeader({ title, subtitle }: { title?: string, subtitle?: string }) {
  // CORRECT PATH: Since it is in the public folder, we just use /
  const logoImage = "/school_logo.png";

  return (
    // FIXED CLASS: Added 'md:hidden' so this header disappears on laptops/desktops
    <header className="sticky top-0 bg-primary text-primary-foreground z-40 px-6 py-4 shadow-lg border-b border-white/10 md:hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/">
            <div className="cursor-pointer">
              <img 
                src={logoImage} 
                alt="RND Hub Logo" 
                className="w-10 h-10 rounded-lg shadow-sm object-contain bg-white p-0.5" 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          </Link>
          <div>
            <Link href="/">
              <h1 className="font-display font-bold text-xl cursor-pointer tracking-tight">
                RND Hub
              </h1>
            </Link>
            {subtitle && (
              <p className="text-[10px] text-primary-foreground/70 font-bold uppercase tracking-widest mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}