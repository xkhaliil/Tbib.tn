import React from "react";

import { getDoctorById } from "@/actions/doctors";
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
type doctor = Awaited<ReturnType<typeof getDoctorById>>;
interface HealthcareProviderDetailsPageParams {
  doctor: doctor;
}
export function SpecificUserData({
  doctor,
}: HealthcareProviderDetailsPageParams) {
  return (
    <form className="grid w-full items-start gap-6">
      <fieldset className="grid gap-6 rounded-lg border p-4">
        <legend className="-ml-1 px-1 text-sm font-medium">
          Healthcare-provider's data
        </legend>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-3">
            <Label htmlFor="speciality">Speciality</Label>
            <div className="font-mono rounded-md border px-4 py-3 text-sm">
              {doctor?.speciality}
            </div>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="ln">License Number</Label>
            <div className="font-mono rounded-md border px-4 py-3 text-sm">
              {doctor?.licenseNumber}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="grid gap-3">
            <Label htmlFor="ol">Office location</Label>
            <div className="font-mono rounded-md border px-4 py-3 text-sm">
              {doctor?.officeAddress}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="sl">Spoken language</Label>

          <div className="flex items-center space-x-3">
            {doctor?.spokenLanguages.map((lang) => (
              <Badge key={lang} variant="info">
                {lang}
              </Badge>
            ))}
          </div>
        </div>
        <Label htmlFor="insurances">Insurances</Label>

        <ScrollArea className="h-36 w-full rounded-md border">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">
              List of accepted insurances
            </h4>
            {doctor?.insurances.map((i) => (
              <>
                <div key={i} className="text-sm">
                  {i}
                </div>
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
            {doctor?.services.map((service) => (
              <>
                <div key={service} className="text-sm">
                  {service}
                </div>
              </>
            ))}
          </div>
        </ScrollArea>
      </fieldset>
    </form>
  );
}
