import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  gradient?: boolean;
}

export function StatCard({ title, value, change, changeType = "neutral", icon: Icon, gradient }: StatCardProps) {
  return (
    <div className={cn(
      "stat-card group relative overflow-hidden",
      gradient && "bg-gradient-to-br from-primary/10 via-card to-card border-primary/20"
    )}>
      {gradient && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
      )}
      
      <div className="relative flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {change && (
            <div className="flex items-center gap-1">
              <span className={cn(
                "text-sm font-medium",
                changeType === "positive" && "text-success",
                changeType === "negative" && "text-destructive",
                changeType === "neutral" && "text-muted-foreground"
              )}>
                {change}
              </span>
              <span className="text-xs text-muted-foreground">vs last period</span>
            </div>
          )}
        </div>
        
        <div className={cn(
          "p-3 rounded-xl transition-all duration-300 group-hover:scale-110",
          gradient 
            ? "bg-gradient-to-br from-primary to-orange-400 shadow-lg shadow-primary/30"
            : "bg-secondary"
        )}>
          <Icon className={cn(
            "w-5 h-5",
            gradient ? "text-primary-foreground" : "text-muted-foreground"
          )} />
        </div>
      </div>
    </div>
  );
}
