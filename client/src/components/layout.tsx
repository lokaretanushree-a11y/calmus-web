import { useAuth } from "@/hooks/use-auth";
import { Link, useLocation } from "wouter";
import { Button } from "./ui/button";
import { 
  LogOut, 
  LayoutDashboard, 
  PenTool, 
  User 
} from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth();
  const [location] = useLocation();

  if (!user) {
    return <>{children}</>;
  }

  const isActive = (path: string) => location === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-white to-blue-50/50">
      <nav className="border-b bg-white/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/">
                <span className="text-2xl font-bold font-display text-primary cursor-pointer">
                  CALMUS
                </span>
              </Link>
              
              <div className="hidden md:flex items-center gap-2">
                <Link href="/dashboard">
                  <Button 
                    variant={isActive("/dashboard") ? "secondary" : "ghost"}
                    className="gap-2"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Button>
                </Link>
                <Link href="/check-in">
                  <Button 
                    variant={isActive("/check-in") ? "secondary" : "ghost"}
                    className="gap-2"
                  >
                    <PenTool className="w-4 h-4" />
                    Check In
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-sm text-muted-foreground">
                Hi, {user.displayName || user.email?.split('@')[0]}
              </div>
              <Button variant="ghost" size="icon" onClick={signOut} title="Sign Out">
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-enter">
          {children}
        </div>
      </main>
    </div>
  );
}
