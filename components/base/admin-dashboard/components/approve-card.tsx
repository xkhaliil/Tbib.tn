"use client";

import React, { useState } from "react";

import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import {
  deleteHealthcareProvider,
  sendCustom,
  verifyHealthcareProvider,
} from "@/actions/admin";
import { getHealthcareProviderById } from "@/actions/auth";
import { CheckIcon, EyeOpenIcon, TrashIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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

type HealthcareProvider = Awaited<ReturnType<typeof getHealthcareProviderById>>;

interface HealthcareProvidersDataTableActionsProps {
  healthcareProvider: HealthcareProvider;
}

export default function ApproveCard({
  healthcareProvider,
}: HealthcareProvidersDataTableActionsProps) {
  const router = useRouter();
  const healthcareProviderEmail = healthcareProvider!.user.email;
  const healthcareProviderName = healthcareProvider!.user.name;
  const [isPending, startTransition] = React.useTransition();
  const [content, setContent] = useState("");
  const handleCustom = () => {
    if (content === "") {
      toast.error("Please type your email content");
      return;
    } else {
      startTransition(() => {
        sendCustom(
          healthcareProviderEmail,
          "oladoc-customer-service",
          "From Oladoc customer service team!",
          healthcareProviderName,
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
      verifyHealthcareProvider(
        id,
        healthcareProviderEmail,
        "oladoc-customer-service",
        "Your Oladoc pro account is now verified!",
        healthcareProviderName,
      ).then(async (data) => {
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
      deleteHealthcareProvider(
        id,
        healthcareProviderEmail,
        "oladoc-customer-service",
        "Your Oladoc pro account has been deleted!",
        healthcareProviderName,
      ).then((data) => {
        if (data?.error) {
          toast.error(data.error);
          return;
        }
        if (data?.success) {
          toast.success(data.success);
          router.push("/admin/healthcare-providers");
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
                onClick={() => handleVerify(healthcareProvider!.id)}
                disabled={isPending || healthcareProvider?.accountVerified}
              >
                {isPending ? <Spinner /> : <CheckIcon className="h-4 w-4" />}
                <span>Verify</span>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="gap-1"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <Spinner />
                    ) : (
                      <TrashIcon className="h-4 w-4" />
                    )}
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to delete this account?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      this account and remove the data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="mt-0">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(healthcareProvider!.id)}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </fieldset>
    </form>
  );
}
