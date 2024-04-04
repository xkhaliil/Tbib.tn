import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function NotificationsCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start border-b bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            View all the notifications related to your healthcare center.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-[54px]">
        <h1 className="text-center text-sm font-medium">
          No notifications found.
        </h1>
      </CardContent>
    </Card>
  );
}
