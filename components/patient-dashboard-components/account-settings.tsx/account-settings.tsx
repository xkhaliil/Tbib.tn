import React from "react";

import { CircleUser, KeyRound, Mail, Phone } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

export function PatientAccountSettings() {
  return (
    <div className="">
      <div className="pl-1 text-lg font-bold">Identity</div>
      <Separator className="w-3/4" />
      <Dialog>
        <DialogTrigger>
          <div className="mt-2 flex h-16 w-screen items-center justify-between space-x-4  pl-4 hover:bg-gray-200">
            <div className="flex items-center space-x-4">
              <CircleUser className="h-7 w-7" />
              <div>My profile</div>
            </div>
            <div>{">"}</div>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <div className="mt-5 pl-1 text-lg font-bold">Connection</div>
      <Separator className="w-3/4" />
      <Dialog>
        <DialogTrigger>
          {" "}
          <div className="mt-2 flex h-16 w-screen items-center justify-between space-x-4  pl-4 hover:bg-gray-200">
            <div className="flex items-center space-x-4">
              <Phone className="h-7 w-7" />
              <div>Phone</div>
            </div>
            <div>{">"}</div>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <div className="flex h-16 w-screen items-center justify-between space-x-4  pl-4 hover:bg-gray-200">
        <div className="flex items-center space-x-4">
          <Mail className="h-7 w-7" />
          <div>E-mail</div>
        </div>
        <div>{">"}</div>
      </div>
      <div className="flex h-16 w-screen items-center justify-between space-x-4  pl-4 hover:bg-gray-200">
        <div className="flex items-center space-x-4">
          <KeyRound className="h-7 w-7" />
          <div>Password</div>
        </div>
        <div>{">"}</div>
      </div>

      <div className="mt-5 pl-1 text-lg font-bold">Security</div>
      <Separator className="w-3/4" />

      <Dialog>
        <DialogTrigger>
          {" "}
          <div className="mt-2 flex h-16 w-screen items-center justify-between space-x-4  pl-4 hover:bg-gray-200">
            <div className="flex items-center space-x-4">
              <Phone className="h-7 w-7" />
              <div>Double authentication</div>
            </div>
            <div>{">"}</div>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
