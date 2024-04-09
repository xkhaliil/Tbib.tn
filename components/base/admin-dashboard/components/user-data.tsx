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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AdminNavbar } from "@/components/base/admin-dashboard/admin-navbar";
import { AdminSidebar } from "@/components/base/admin-dashboard/admin-sidebar";

export function UserData() {
  return (
    <form className="grid w-full items-start gap-6">
      <fieldset className="grid gap-6 rounded-lg border p-4">
        <legend className="-ml-1 px-1 text-sm font-medium">Account data</legend>
        <Avatar className="h-[5.5rem] w-[5.5rem]">
          <AvatarImage />
          <AvatarFallback>
            <span className="text-3xl">US</span>
          </AvatarFallback>
        </Avatar>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <div className="font-mono rounded-md border px-4 py-3 text-sm">
              Jhon doe
            </div>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <div className="font-mono rounded-md border px-4 py-3 text-sm">
              jhondoe@mail.com
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-3">
            <Label htmlFor="gender">Gender</Label>
            <div className="font-mono rounded-md border px-4 py-3 text-sm">
              Male
            </div>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="dob">Date of birth</Label>
            <div className="font-mono rounded-md border px-4 py-3 text-sm">
              01/01/1990
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="grid gap-3">
            <Label htmlFor="phone">Phone</Label>
            <div className="font-mono rounded-md border px-4 py-3 text-sm">
              123456789
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="grid gap-3">
            <Label htmlFor="state">State</Label>
            <div className="font-mono rounded-md border px-4 py-3 text-sm">
              Tunis
            </div>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="city">City</Label>
            <div className="font-mono rounded-md border px-4 py-3 text-sm">
              Tunis
            </div>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="pc">Postal code</Label>
            <div className="font-mono rounded-md border px-4 py-3 text-sm">
              1000
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="grid gap-3">
            <Label htmlFor="name">Bio</Label>
            <div className="font-mono rounded-md border px-4 py-3 text-sm">
              Jhon doe
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="name">Email verification</Label>
          <Badge variant="success">Verified</Badge>
        </div>
      </fieldset>
    </form>
  );
}
