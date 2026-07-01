import { Card, CardContent, CardHeader, CardTitle } from "@/components/design-system/card";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export type AlertType = 'warning' | 'success';

export interface AlertItem {
  id: string | number;
  type: AlertType;
  message: string;
}

interface AlertCenterProps {
  alerts: AlertItem[];
}

export function AlertCenter({ alerts }: AlertCenterProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Alert Center</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="flex items-center gap-3">
            {alert.type === 'warning' ? (
              <AlertCircle className="w-5 h-5 text-destructive" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            )}
            <span className="text-sm">{alert.message}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
