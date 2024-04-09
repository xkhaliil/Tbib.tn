import React from "react";

import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

export default function ApproveCard() {
  return (
    <form className="grid w-full items-start gap-6">
      <fieldset className="grid gap-6 rounded-lg border p-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="grid gap-3">
            <div className="flex items-center  space-x-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="info">Request more information</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      Send email to the current healthcare provider.
                    </DialogTitle>
                    <DialogDescription>
                      The content writen bellow will be sent in the body of the
                      email
                    </DialogDescription>
                    <div className="  rounded-sm border bg-slate-100 p-3">
                      <Label htmlFor="email" className="sr-only">
                        Email
                      </Label>
                      <Textarea
                        id="email"
                        rows={7}
                        placeholder="Type your email here..."
                        className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0 "
                      />
                    </div>
                    <div className="mt-3 flex justify-end">
                      <Button variant="green">Send</Button>
                    </div>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <Button variant="green">Approve</Button>
              <Button variant="destructive">Reject</Button>
            </div>
          </div>
        </div>
      </fieldset>
    </form>
  );
}
