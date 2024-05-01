"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";
import {
  deleteHealthcareCenter,
  deleteHealthcareProvider,
  getSelectedHealthcareCenter,
  sendCustom,
  verifyHealthcareCenter,
  verifyHealthcareProvider,
} from "@/actions/admin";
import { CheckIcon } from "@radix-ui/react-icons";
import { TrashIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";

type hcc = Awaited<ReturnType<typeof getSelectedHealthcareCenter>>;
interface HealthcareCenterDetailsPageParams {
  hcc: hcc;
}
export default function ApproveCard({
  hcc,
}: HealthcareCenterDetailsPageParams) {
  const router = useRouter();
  const healthcareCenterEmail = hcc!.user.email;
  const healthcareCenterName = hcc!.user.name;
  const [content, setContent] = useState("");
  const [isPending, startTransition] = React.useTransition();
  const handleCustom = () => {
    if (content === "") {
      toast.error("Please type your email content");
      return;
    } else {
      startTransition(() => {
        sendCustom(
          healthcareCenterEmail,
          "oladoc-customer-service",
          "From Oladoc customer service team!",
          healthcareCenterName,
          content,
        ).then(async (data) => {
          if (data?.success) {
            toast.success(data.success);
            setContent("");
          }
        });
      });
    }
  };
  const handleVerify = (id: string) => {
    startTransition(() => {
      verifyHealthcareCenter(
        id,
        healthcareCenterEmail,
        "oladoc-customer-service",
        "From Oladoc customer service team!",
        healthcareCenterName,
      ).then((data) => {
        if (data?.error) {
          toast.error(data.error);
          return;
        }
        if (data?.success) {
          toast.success(data.success);
        }
      });
    });
  };

  const handleDelete = (id: string) => {
    startTransition(() => {
      deleteHealthcareCenter(
        id,
        healthcareCenterEmail,
        "oladoc-customer-service",
        "From Oladoc customer service team!",
        healthcareCenterName,
      ).then((data) => {
        if (data?.error) {
          toast.error(data.error);
          return;
        }
        if (data?.success) {
          toast.success(data.success);
          router.push("/admin/healthcare-centers");
        }
      });
    });
  };

  return (
    <form className="grid w-full items-start gap-6">
      <fieldset className="grid gap-6 rounded-lg border p-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="grid gap-3">
            <div className="flex items-center  space-x-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="info">Send custom email</Button>
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
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                      />
                    </div>
                    <div className="mt-3 flex justify-end">
                      <Button
                        variant="green"
                        onClick={() => handleCustom()}
                        disabled={isPending}
                      >
                        Send{" "}
                        {isPending ? (
                          <Spinner />
                        ) : (
                          <CheckIcon className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <Button
                size="sm"
                variant="green"
                className="gap-1"
                onClick={() => handleVerify(hcc!.id)}
                disabled={isPending || hcc?.accountVerified}
              >
                {isPending ? <Spinner /> : <CheckIcon className="h-4 w-4" />}
                <span>Verify</span>
              </Button>
              <Button
                size="sm"
                variant="destructive"
                className="gap-1"
                onClick={() => handleDelete(hcc!.id)}
                disabled={isPending}
              >
                {isPending ? <Spinner /> : <TrashIcon className="h-4 w-4" />}
                <span>Delete</span>
              </Button>
            </div>
          </div>
        </div>
      </fieldset>
    </form>
  );
}
