import React from "react";

import Link from "next/link";
import { SlashIcon } from "@radix-ui/react-icons";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";

import { BookAppointmentForm } from "./forms/book-appointment-form";

export function BookAppointmentHeader() {
  return (
    <div className="mt-8">
      <div className="flex flex-col space-y-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <SlashIcon />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Healthcare Provider</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <SlashIcon />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Book</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold text-primary">
            Book an appointment
          </h1>
          <p className="text-base text-muted-foreground">
            Fill in the details below to book an appointment with a healthcare
            provider.
          </p>
        </div>
      </div>

      <Separator className="my-8" />

      <BookAppointmentForm />
    </div>
  );
}
