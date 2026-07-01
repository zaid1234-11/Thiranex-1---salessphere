import { Card, CardContent, CardHeader, CardTitle } from "@/components/design-system/card";

export type ActivityColor = 'primary' | 'secondary' | 'accent';

export interface ActivityItem {
  id: string | number;
  title: string;
  timestamp: string;
  color: ActivityColor;
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const colorMap: Record<ActivityColor, string> = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    accent: "bg-accent"
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-4">
            <div className={`w-2 h-2 mt-1.5 rounded-full ${colorMap[activity.color]}`} />
            <div>
              <p className="text-sm font-medium">{activity.title}</p>
              <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
