import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Activity, Heart, Shield } from "lucide-react";
import { motion } from "framer-motion";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <span className="text-2xl font-bold font-display text-primary">CALMUS</span>
          <div className="flex gap-4">
            <Link href="/auth">
              <Button variant="ghost">Log In</Button>
            </Link>
            <Link href="/auth?signup=true">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-background to-background" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Find your inner <span className="text-gradient">calm</span>.
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Your personal mental wellness companion. Track your moods, analyze your feelings, 
              and discover resources to help you thrive on campus.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth?signup=true">
                <Button size="lg" className="text-lg px-8 h-14 rounded-full">
                  Start Your Journey <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/auth">
                <Button size="lg" variant="secondary" className="text-lg px-8 h-14 rounded-full">
                  Sign In
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <FeatureCard 
              icon={Activity} 
              title="Mood Tracking" 
              desc="Log your daily feelings and spot trends over time with our intuitive interface."
            />
            <FeatureCard 
              icon={Heart} 
              title="Sentiment Analysis" 
              desc="Powered by AI to help you understand the emotions behind your words."
            />
            <FeatureCard 
              icon={Shield} 
              title="Private & Secure" 
              desc="Your mental health data is encrypted and completely private to you."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} CALMUS. Built for student wellbeing.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4 rounded-2xl bg-white shadow-sm mb-6 text-primary">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}
