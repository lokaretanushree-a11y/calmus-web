import { useAuth } from "@/hooks/use-auth";
import { useMoodHistory } from "@/hooks/use-moods";
import { Link } from "wouter";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmotionBadge } from "@/components/emotion-badge";
import { format } from "date-fns";
import { 
  Plus, 
  BookOpen, 
  Phone, 
  Users, 
  ChevronRight,
  TrendingUp
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  CartesianGrid 
} from "recharts";

export default function Dashboard() {
  const { user } = useAuth();
  const { data: moods, isLoading } = useMoodHistory(user?.uid);

  // Prepare chart data (last 7 entries reversed for chronological order)
  const chartData = moods?.slice(0, 7).reverse().map(m => ({
    date: format(m.createdAt as Date, 'MMM d'),
    score: m.sentimentScore,
    emotion: m.emotionCategory
  }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-foreground">
            Welcome back, {user?.displayName?.split(' ')[0] || 'Friend'}
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's an overview of your mental wellness journey.
          </p>
        </div>
        <Link href="/check-in">
          <Button size="lg" className="rounded-full shadow-lg hover:shadow-primary/25">
            <Plus className="w-5 h-5 mr-2" /> New Check-In
          </Button>
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Mood Trend Chart */}
          <Card className="border-none shadow-md bg-white/60 backdrop-blur">
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg">Mood Trends</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="h-[300px]">
              {chartData && chartData.length > 1 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <defs>
                      <linearGradient id="lineColor" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#0ea5e9" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="date" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#64748b', fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis hide domain={[-1, 1]} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="url(#lineColor)" 
                      strokeWidth={3}
                      dot={{ fill: 'white', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground bg-slate-50/50 rounded-xl border border-dashed">
                  <p>Not enough data yet.</p>
                  <p className="text-sm">Complete a few check-ins to see your trends!</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Entries */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold font-display">Recent Entries</h2>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-24 bg-slate-100 rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : moods?.length === 0 ? (
              <Card className="p-8 text-center bg-slate-50/50 border-dashed">
                <p className="text-muted-foreground mb-4">No entries yet.</p>
                <Link href="/check-in">
                  <Button variant="outline">Start Your First Entry</Button>
                </Link>
              </Card>
            ) : (
              moods?.map((mood) => (
                <Card key={mood.id} className="group hover:border-primary/30 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <EmotionBadge emotion={mood.emotionCategory} />
                        <span className="text-sm text-muted-foreground">
                          {format(mood.createdAt as Date, "MMMM d, h:mm a")}
                        </span>
                      </div>
                    </div>
                    <p className="text-foreground/80 line-clamp-2">{mood.text}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Sidebar: Resources */}
        <div className="space-y-6">
          <Card className="bg-primary text-primary-foreground border-none shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5" /> Need Help Now?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              <p className="text-blue-100 text-sm">
                If you're in crisis, confidential support is available 24/7.
              </p>
              <div className="grid gap-2">
                <Button variant="secondary" className="w-full justify-start text-primary font-semibold">
                  Campus Police: 555-0123
                </Button>
                <Button variant="glass" className="w-full justify-start font-semibold">
                  Crisis Line: 988
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Campus Resources</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                <ResourceItem 
                  icon={Users} 
                  title="Counseling Center" 
                  desc="Book an appointment" 
                />
                <ResourceItem 
                  icon={BookOpen} 
                  title="Self-Help Library" 
                  desc="Articles & guides" 
                />
                <ResourceItem 
                  icon={Activity} 
                  title="Wellness Workshops" 
                  desc="Join group sessions" 
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ResourceItem({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <button className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors text-left group">
      <div className="flex items-center gap-4">
        <div className="p-2 rounded-lg bg-blue-50 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <div className="font-medium">{title}</div>
          <div className="text-xs text-muted-foreground">{desc}</div>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
    </button>
  );
}
