"use client";

import React from "react";

import { getHealthCareProviderById } from "@/actions/healthcare-provider";
import { Appointment, HealthCareProvider, User } from "@prisma/client";
import {
  CalendarIcon,
  ClockIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";
import { format } from "date-fns";
import { PhoneIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AppointmentDetailsDialogProps {
  appointment: Appointment & {
    healthCareProvider: Awaited<ReturnType<typeof getHealthCareProviderById>>;
  };
}

export function AppointmentDetailsDialog({
  appointment,
}: AppointmentDetailsDialogProps) {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">View Details</Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-4xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold leading-none tracking-tight">
              Appointment Details
            </h1>
            <Badge variant="white" className="uppercase">
              # {appointment.id}
            </Badge>
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <h1 className="text-md font-semibold leading-none tracking-tight">
            Healthcare Provider Information
          </h1>

          <Card className="shadow-none">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={
                      appointment.healthCareProvider?.user.image ||
                      "/placeholder.svg"
                    }
                  />
                  <AvatarFallback>
                    {appointment.healthCareProvider?.user.name[0]}
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                  <p className="text-lg font-semibold">
                    {appointment.healthCareProvider?.user.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {appointment.healthCareProvider?.speciality}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <EnvelopeClosedIcon className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {appointment.healthCareProvider?.user.email}
                  </p>
                </div>
                <span className="text-muted-foreground">|</span>
                <div className="flex items-center gap-2">
                  <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    (+216) {appointment.healthCareProvider?.user.phone}
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-muted p-4">
                <p className="text-sm">
                  {appointment.healthCareProvider?.user.bio}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-4">
            <h1 className="text-md font-semibold leading-none tracking-tight">
              Symptoms Information
            </h1>
          </div>

          {!appointment.symptoms ||
          !appointment.symptomsType ||
          !appointment.symptomsDuration ||
          !appointment.symptomsLength ||
          !appointment.symptomsSeverity ||
          !appointment.additionalImages ? (
            <Card className="shadow-none">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <p className="text-sm text-muted-foreground">
                    No symptoms information provided.
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-none">
              <CardContent className="p-6">
                <div className="flex flex-col gap-1 text-sm">
                  <p className="font-semibold">Symptoms</p>
                  <p className="text-muted-foreground">
                    {appointment.symptoms}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-4">
                  <Badge variant="white">{appointment.symptomsType}</Badge>
                  <Badge variant="white">
                    {Number(appointment.symptomsDuration) > 1
                      ? `${appointment.symptomsDuration} ${
                          appointment.symptomsLength.charAt(0).toUpperCase() +
                          appointment.symptomsLength.slice(1).toLowerCase()
                        }`
                      : `${appointment.symptomsDuration} ${
                          appointment.symptomsLength.charAt(0).toUpperCase() +
                          appointment.symptomsLength
                            .slice(1)
                            .toLowerCase()
                            .slice(0, -1)
                        }`}
                  </Badge>
                  <Badge variant="white">
                    {appointment.symptomsSeverity.charAt(0).toUpperCase() +
                      appointment.symptomsSeverity.slice(1).toLowerCase()}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex flex-col gap-4">
            <h1 className="text-md font-semibold leading-none tracking-tight">
              Booking Information
            </h1>

            <Card className="shadow-none">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <p className="text-lg font-semibold">{appointment.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {appointment.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(appointment.date), "EEEE, MMMM d, yyyy")}
                    </p>
                  </div>
                  <span className="text-muted-foreground">|</span>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(appointment.startTime), "HH:mm")} -{" "}
                      {format(new Date(appointment.endTime), "HH:mm")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
