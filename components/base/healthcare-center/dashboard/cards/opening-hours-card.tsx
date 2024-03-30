import React from "react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function OpeningHoursCard() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-start border-b bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle>Opening Hours</CardTitle>
          <CardDescription>
            Here all the opening hours of your healthcare center.
          </CardDescription>
        </div>
        <div className="ml-auto flex items-center">
          <Button variant="blue" size="sm" asChild>
            <Link href="/hc/opening-hours">Manage</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between border-b pb-4">
            <div className="font-medium">Monday</div>
            <div className="text-muted-foreground">09:00 - 17:00</div>
          </div>
          <div className="flex justify-between border-b pb-4">
            <div className="font-medium">Tuesday</div>
            <div className="text-muted-foreground">09:00 - 17:00</div>
          </div>
          <div className="flex justify-between border-b pb-4">
            <div className="font-medium">Wednesday</div>
            <div className="text-muted-foreground">09:00 - 17:00</div>
          </div>
          <div className="flex justify-between border-b pb-4">
            <div className="font-medium">Thursday</div>
            <div className="text-muted-foreground">09:00 - 17:00</div>
          </div>
          <div className="flex justify-between border-b pb-4">
            <div className="font-medium">Friday</div>
            <div className="text-muted-foreground">09:00 - 17:00</div>
          </div>
          <div className="flex justify-between border-b pb-4">
            <div className="font-medium">Saturday</div>
            <div className="text-muted-foreground">09:00 - 17:00</div>
          </div>
          <div className="flex justify-between">
            <div className="font-medium">Sunday</div>
            <span className="rounded-sm bg-rose-100 px-2.5 py-1 text-xs font-medium text-rose-600">
              Closed
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 p-6">
        <div className="text-xs text-muted-foreground">
          Last updated {new Date().toLocaleDateString()}
        </div>
      </CardFooter>
    </Card>
  );
}
