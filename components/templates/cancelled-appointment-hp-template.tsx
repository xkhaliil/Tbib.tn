import React from "react";

import { getAppointmentById } from "@/actions/appointment";
import {
  getPatientByUserId,
  getUserByHealthcareProviderId,
} from "@/actions/auth";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { format } from "date-fns";

interface CancelledAppointmentHPTemplateProps {
  healthcareProvider: Awaited<ReturnType<typeof getUserByHealthcareProviderId>>;
  patient: Awaited<ReturnType<typeof getPatientByUserId>>;
  appointment: Awaited<ReturnType<typeof getAppointmentById>>;
}

export function CancelledAppointmentHPTemplate({
  healthcareProvider,
  patient,
  appointment,
}: CancelledAppointmentHPTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>Appointment Cancelled</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="w-full max-w-[600px]">
            <Section className="flex items-center justify-center">
              <Text className="text-3xl font-bold tracking-tighter text-blue-600">
                Oladoc
              </Text>
            </Section>
            <Heading className="text-4xl font-bold text-blue-600">
              Appointment Cancelled
            </Heading>
            <Text className="mt-4 text-base text-muted-foreground">
              Hi <strong>Dr. {healthcareProvider?.name}</strong>, your
              appointment with <strong>{patient?.user.name}</strong> on{" "}
              <strong>
                {format(appointment?.date || new Date(), "EEEE, MMMM do, yyyy")}
              </strong>{" "}
              at{" "}
              <strong>
                {format(appointment?.startTime || new Date(), "HH:mm")}
              </strong>{" "}
              has been cancelled.
            </Text>
            <Section className="mb-5 text-center">
              <Button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-600/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                href="http://localhost:3000/hp/dashboard/calendar"
              >
                View Details
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
