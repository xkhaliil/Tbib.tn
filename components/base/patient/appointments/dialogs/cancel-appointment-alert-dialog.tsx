"use client";

import React from "react";

import { getAppointmentWithHPById } from "@/actions/appointment";
import { cancelAppointment } from "@/actions/patient";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface CancelAppointmentAlertDialogProps {
  appointment: Awaited<ReturnType<typeof getAppointmentWithHPById>>;
}

export function CancelAppointmentAlertDialog({
  appointment,
}: CancelAppointmentAlertDialogProps) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [isPending, startTransition] = React.useTransition();

  const handleCancel = () => {
    startTransition(() => {
      cancelAppointment(appointment?.id)
        .then(() => {
          toast.success("Appointment cancelled successfully");
          setOpen(false);
        })
        .catch(() => {
          toast.error("Failed to cancel appointment");
        });
    });
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Cancel</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel Appointment</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to cancel this appointment? Your healthcare
            provider will be notified of the cancellation. This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="mt-0">Cancel</AlertDialogCancel>
          <Button
            className={buttonVariants({ variant: "destructive" })}
            onClick={handleCancel}
            disabled={isPending}
          >
            {isPending && <Spinner className="mr-2" />}
            Confirm
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
