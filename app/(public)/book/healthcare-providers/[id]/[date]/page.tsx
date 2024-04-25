import React from "react";

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
