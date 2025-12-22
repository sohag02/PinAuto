import { Pin, Clock, TrendingUp, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Activity {
  id: string;
  type: "pin_posted" | "pin_scheduled" | "group_joined" | "error";
  message: string;
  time: string;
}

const activities: Activity[] = [
  { id: "1", type: "pin_posted", message: "Pin posted: Minimalist Planner → Home Decor", time: "2 min ago" },
  { id: "2", type: "group_joined", message: "Joined: Etsy Sellers Network (12.5K members)", time: "15 min ago" },
  { id: "3", type: "pin_scheduled", message: "10 new pins scheduled for tomorrow", time: "1 hour ago" },
  { id: "4", type: "pin_posted", message: "Pin posted: Cozy Crochet Pattern → DIY Crafts", time: "2 hours ago" },
  { id: "5", type: "error", message: "Rate limit reached on Pinterest Account #2", time: "3 hours ago" },
];

const getActivityIcon = (type: Activity["type"]) => {
  switch (type) {
    case "pin_posted": return Pin;
    case "pin_scheduled": return Clock;
    case "group_joined": return TrendingUp;
    case "error": return AlertCircle;
  }
};

const getActivityStyle = (type: Activity["type"]) => {
  switch (type) {
    case "pin_posted": return "bg-success/20 text-success";
    case "pin_scheduled": return "bg-info/20 text-info";
    case "group_joined": return "bg-accent/20 text-accent";
    case "error": return "bg-destructive/20 text-destructive";
  }
};

export function ActivityFeed() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <Badge variant="secondary">Live</Badge>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = getActivityIcon(activity.type);
          const style = getActivityStyle(activity.type);
          
          return (
            <div 
              key={activity.id} 
              className="flex items-start gap-3 animate-slide-in opacity-0"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <div className={`p-2 rounded-lg ${style}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{activity.message}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
