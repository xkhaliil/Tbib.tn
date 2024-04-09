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
import ApproveCard from "@/components/base/admin-dashboard/components/approve-card";
import PdfViewer from "@/components/base/admin-dashboard/components/pdf-viewer";
import { SpecificUserData } from "@/components/base/admin-dashboard/components/specific-user-data";
import { UserData } from "@/components/base/admin-dashboard/components/user-data";

interface HealthcareProviderDetailsPageParams {
  params: {
    id: string;
  };
}

export default function HealthcareProviderDetailsPage({
  params,
}: HealthcareProviderDetailsPageParams) {
  return (
    <div>
      <div className="grid h-screen md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <AdminSidebar />
        <div className="flex flex-col">
          <AdminNavbar />
          <div className="grid h-screen w-full ">
            <div className="flex flex-col">
              <header className=" top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
                <h1 className="text-xl font-semibold">(username) details</h1>
              </header>
              <main className="grid flex-1 gap-4 overflow-auto p-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <div className="relative flex-col items-start gap-8 md:flex">
                  <UserData />
                </div>
                <div>
                  <SpecificUserData />
                </div>
                <div className="grid grid-rows-6 flex-col ">
                  <PdfViewer />
                  <div>
                    <ApproveCard />
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
