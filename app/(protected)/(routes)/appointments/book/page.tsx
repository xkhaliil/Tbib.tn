import React from "react";

import { BookAppointmentHeader } from "@/components/base/book-appointment-header";
import { BookApppointmentNavbar } from "@/components/base/book-appointment-navbar";
import { Container } from "@/components/container";

export default function BookAppointmentPage() {
  return (
    <div className="flex h-screen flex-col">
      <BookApppointmentNavbar />
      <Container className="max-w-[1600px] flex-1">
        <BookAppointmentHeader />
      </Container>
    </div>
  );
}
