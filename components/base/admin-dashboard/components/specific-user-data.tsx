import React from "react";

import {
  Bird,
  Book,
  Bot,
  Code2,
  CornerDownLeft,
  LifeBuoy,
  Mic,
  Paperclip,
  Rabbit,
  Settings,
  Settings2,
  Share,
  SquareUser,
  Triangle,
  Turtle,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { AdminNavbar } from "@/components/base/admin-dashboard/admin-navbar";
import { AdminSidebar } from "@/components/base/admin-dashboard/admin-sidebar";

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `Service N'${a.length + i}`,
);
export function SpecificUserData() {
  return (
    <form className="grid w-full items-start gap-6">
      <fieldset className="grid gap-6 rounded-lg border p-4">
        <legend className="-ml-1 px-1 text-sm font-medium">
          Healthcare provider data
        </legend>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-3">
            <Label htmlFor="speciality">Speciality</Label>
            <div className="font-mono rounded-md border px-4 py-3 text-sm">
              General Practitioner
            </div>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="ln">License Number</Label>
            <div className="font-mono rounded-md border px-4 py-3 text-sm">
              123456789
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="grid gap-3">
            <Label htmlFor="ol">Office location</Label>
            <div className="font-mono rounded-md border px-4 py-3 text-sm">
              Tunis
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="sl">Spoken language</Label>

          <div className="flex items-center space-x-3">
            <Badge variant="info">English</Badge>
            <Badge variant="info">French</Badge>
          </div>
        </div>
        <Label htmlFor="insurances">Insurances</Label>

        <ScrollArea className="h-36 w-full rounded-md border">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">
              List of accepted insurances
            </h4>
            {tags.map((tag) => (
              <>
                <div key={tag} className="text-sm">
                  {tag}
                </div>
                <Separator className="my-2" />
              </>
            ))}
          </div>
        </ScrollArea>

        <Label htmlFor="services">Services</Label>

        <ScrollArea className="h-36 w-full rounded-md border">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">
              List of provided services
            </h4>
            {tags.map((tag) => (
              <>
                <div key={tag} className="text-sm">
                  {tag}
                </div>
                <Separator className="my-2" />
              </>
            ))}
          </div>
        </ScrollArea>
      </fieldset>
    </form>
  );
}
