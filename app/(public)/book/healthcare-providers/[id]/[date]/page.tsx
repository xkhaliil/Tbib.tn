import React from "react";

import type { Metadata } from "next";
import {
  getHealthCareProviderById,
  getHealthCareProviderTimeSlots,
} from "@/actions/healthcare-provider";
import { getDay } from "date-fns";

import { BookAppointmentHeader } from "@/components/base/book-appointment/header";
import { BookApppointmentNavbar } from "@/components/base/book-appointment/navbar";
import { Container } from "@/components/container";

interface BookAppointmentPageProps {
  params: {
    id: string;
    date: string;
  };
}

export async function generateMetadata({
  params: { id, date },
}: BookAppointmentPageProps): Promise<Metadata> {
  const healthcareProvider = await getHealthCareProviderById(id);
  const day = getDay(new Date(date));
  return {
    title: `Book an appointment with ${healthcareProvider?.user.name} on ${day}`,
  };
}

export default async function BookAppointmentPage({
  params,
}: BookAppointmentPageProps) {
  const healthcareProvider = await getHealthCareProviderById(params.id);
  const healthcareProviderTimeSlots = await getHealthCareProviderTimeSlots(
    params.id,
    new Date(params.date),
  );

  return (
    <>
      <BookApppointmentNavbar />
      <Container className="max-w-[1600px]">
        <BookAppointmentHeader
          date={params.date}
          healthcareProvider={healthcareProvider}
          timeSlots={healthcareProviderTimeSlots}
        />
      </Container>
    </>
  );
}
