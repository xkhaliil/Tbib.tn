"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function NotificationsForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          Manage how you receive notifications from Oladoc.
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button variant="blue">Save Changes</Button>
      </CardFooter>
    </Card>
  );
}
