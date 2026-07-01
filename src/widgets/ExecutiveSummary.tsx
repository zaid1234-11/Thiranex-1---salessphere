import { Card, CardContent, CardHeader, CardTitle } from "@/components/design-system/card";

export interface ExecutiveSummaryItem {
  text: string;
}

interface ExecutiveSummaryProps {
  items: ExecutiveSummaryItem[];
}

export function ExecutiveSummary({ items }: ExecutiveSummaryProps) {
  return (
    <Card className="h-full bg-gradient-to-br from-card to-card/50 border-primary/20">
      <CardHeader>
        <CardTitle>Executive Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm font-medium">
        {items.map((item, i) => (
          <p key={i} className="flex items-start gap-2">
            <span className="text-primary mt-1">✦</span>
            {item.text}
          </p>
        ))}
      </CardContent>
    </Card>
  );
}
