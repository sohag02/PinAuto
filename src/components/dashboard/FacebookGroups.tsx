import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, ExternalLink, MoreHorizontal, TrendingUp } from "lucide-react";

interface FacebookGroup {
  id: string;
  name: string;
  members: string;
  status: "joined" | "pending" | "not_joined";
  postsSent: number;
  engagement: string;
  category: string;
}

const groups: FacebookGroup[] = [
  { 
    id: "1", 
    name: "Etsy Sellers Network", 
    members: "125K", 
    status: "joined", 
    postsSent: 24, 
    engagement: "3.2%",
    category: "Etsy"
  },
  { 
    id: "2", 
    name: "Crochet Patterns & Ideas", 
    members: "89K", 
    status: "joined", 
    postsSent: 18, 
    engagement: "4.5%",
    category: "Crochet"
  },
  { 
    id: "3", 
    name: "Digital Planners Community", 
    members: "45K", 
    status: "pending", 
    postsSent: 0, 
    engagement: "-",
    category: "Digital Products"
  },
  { 
    id: "4", 
    name: "Home Decor Inspiration", 
    members: "234K", 
    status: "joined", 
    postsSent: 12, 
    engagement: "2.8%",
    category: "Home Decor"
  },
  { 
    id: "5", 
    name: "Small Business Owners", 
    members: "156K", 
    status: "not_joined", 
    postsSent: 0, 
    engagement: "-",
    category: "Business"
  },
];

const getStatusBadge = (status: FacebookGroup["status"]) => {
  switch (status) {
    case "joined": return <Badge variant="success">Joined</Badge>;
    case "pending": return <Badge variant="warning">Pending</Badge>;
    case "not_joined": return <Badge variant="secondary">Not Joined</Badge>;
  }
};

export function FacebookGroups() {
  return (
    <div className="glass-card overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Facebook Groups</h3>
            <p className="text-sm text-muted-foreground">Manage your group targets</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Import CSV
            </Button>
            <Button variant="gradient" size="sm">
              <ExternalLink className="w-4 h-4 mr-2" />
              Add Group
            </Button>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary/30">
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Group</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Members</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Category</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Posts Sent</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Engagement</th>
              <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group, index) => (
              <tr 
                key={group.id} 
                className="border-b border-border/50 hover:bg-secondary/20 transition-colors animate-slide-in opacity-0"
                style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'forwards' }}
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <span className="font-medium text-foreground">{group.name}</span>
                  </div>
                </td>
                <td className="p-4 text-muted-foreground">{group.members}</td>
                <td className="p-4">{getStatusBadge(group.status)}</td>
                <td className="p-4">
                  <Badge variant="outline">{group.category}</Badge>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1 text-foreground">
                    <MessageSquare className="w-4 h-4 text-muted-foreground" />
                    {group.postsSent}
                  </div>
                </td>
                <td className="p-4">
                  {group.engagement !== "-" ? (
                    <div className="flex items-center gap-1 text-success">
                      <TrendingUp className="w-4 h-4" />
                      {group.engagement}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
