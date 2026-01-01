import { Link } from "wouter";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="font-display font-bold text-4xl mb-2 text-foreground">404</h1>
        <p className="text-lg text-muted-foreground mb-8">Oops! We couldn't find the page you were looking for.</p>
        
        <Link href="/">
          <button className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-lg shadow-lg hover:bg-primary/90 hover:-translate-y-0.5 transition-all">
            Return Home
          </button>
        </Link>
      </div>
    </div>
  );
}
