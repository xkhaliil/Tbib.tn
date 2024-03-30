import React from "react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function TeamCard() {
  return (
    <Card className="sm:col-span-2">
      <CardHeader>
        <CardTitle>Team</CardTitle>
        <CardDescription>
          Manage your team members and see their availability.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button variant="blue" asChild>
          <Link href="/hc/team">Manage Team</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
