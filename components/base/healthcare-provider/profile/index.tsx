import React from "react";

import Image from "next/image";
import { getCurrentSession, getPatientByUserId } from "@/actions/auth";
import { getHealthCareProviderUserAndOpeningHoursAndAbsencesById } from "@/actions/healthcare-provider";
import { DoesPatientHaveAtLease1ConsultationWithHealthcareProvider } from "@/actions/patient";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Container } from "@/components/container";

import { BookAppointmentCard } from "./book-appointment-card";
import { LocationCard } from "./location-card";
import { OpeningHoursCard } from "./opening-hours-card";
import { PaymentsMethodsCard } from "./payments-methods-card";
import { PresentationCard } from "./presentation-card";
import { PricingAndRefundsCard } from "./pricing-refunds-card";
import { Reviewscard } from "./reviews-card";
import { ServicesCard } from "./services-card";

interface ProfileProps {
  healthcareProvider: Awaited<
    ReturnType<typeof getHealthCareProviderUserAndOpeningHoursAndAbsencesById>
  >;
}

export async function Profile({ healthcareProvider }: ProfileProps) {
  const currentUser = await getCurrentSession();
  console.log("currentUser", currentUser?.id); 
  const patient = await getPatientByUserId(currentUser?.id);
  console.log("patient", patient?.id);

  var HaveConsultation =
    await DoesPatientHaveAtLease1ConsultationWithHealthcareProvider(
      patient?.id,
      healthcareProvider?.id,
    );
  return (
    <div className="flex w-full flex-col">
      <div className="flex h-52 w-full flex-col justify-center border-b bg-muted">
        <Container className="flex max-w-[1600px] items-center">
          <div className="flex items-center gap-6">
            <Image
              src={healthcareProvider?.user.image || "/placeholder.svg"}
              alt={healthcareProvider?.user.name || "Placeholder"}
              width="500"
              height="500"
              className="h-28 w-28 rounded-xl"
            />
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold tracking-tight">
                {healthcareProvider?.user.name}
              </h1>
              <p className="text-base">{healthcareProvider?.speciality}</p>
              <p className="mt-1 text-sm">{healthcareProvider?.user.email}</p>
            </div>
          </div>
        </Container>
      </div>

      <Tabs defaultValue="overview">
        <div className="flex h-1/4 w-full items-center justify-center overflow-y-auto border-b bg-white">
          <Container className="max-w-[1600px]">
            <TabsList className="h-16 gap-4 rounded-none bg-transparent p-0">
              <TabsTrigger
                value="overview"
                className="w-full px-4 py-2 data-[state=active]:bg-blue-600/90 data-[state=active]:text-white"
              >
                General Overview
              </TabsTrigger>
              <TabsTrigger
                value="location"
                className="w-full px-4 py-2 data-[state=active]:bg-blue-600/90 data-[state=active]:text-white"
              >
                Map & Location
              </TabsTrigger>
              <TabsTrigger
                value="presentation"
                className="w-full px-4 py-2 data-[state=active]:bg-blue-600/90 data-[state=active]:text-white"
              >
                Presentation
              </TabsTrigger>
              <TabsTrigger
                value="opening-hours"
                className="w-full px-4 py-2 data-[state=active]:bg-blue-600/90 data-[state=active]:text-white"
              >
                Opening Hours
              </TabsTrigger>
              <TabsTrigger
                value="pricing"
                className="w-full px-4 py-2 data-[state=active]:bg-blue-600/90 data-[state=active]:text-white"
              >
                Pricing
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="w-full px-4 py-2 data-[state=active]:bg-blue-600/90 data-[state=active]:text-white"
              >
                Reviews ({healthcareProvider?.reviews.length})
              </TabsTrigger>
            </TabsList>
          </Container>
        </div>

        <Container className="max-w-[1600px]">
          <div className="my-10 grid grid-cols-1 gap-6 xl:grid-cols-[1000px_1fr]">
            <TabsContent value="overview">
              <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-4 lg:gap-8">
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                  <PricingAndRefundsCard
                    healthcareProvider={healthcareProvider}
                  />
                </div>

                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                  <PaymentsMethodsCard
                    healthcareProvider={healthcareProvider}
                  />
                </div>

                <div className="grid auto-rows-max items-start gap-4 lg:col-span-4 lg:gap-8">
                  <ServicesCard healthcareProvider={healthcareProvider} />
                </div>

                <div className="grid auto-rows-max items-start gap-4 lg:col-span-4 lg:gap-8">
                  <LocationCard healthcareProvider={healthcareProvider} />
                </div>

                <div className="grid auto-rows-max items-start gap-4 lg:col-span-4 lg:gap-8">
                  <PresentationCard healthcareProvider={healthcareProvider} />
                </div>

                <div className="grid auto-rows-max items-start gap-4 lg:col-span-4 lg:gap-8">
                  <OpeningHoursCard healthcareProvider={healthcareProvider} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="location">
              <LocationCard healthcareProvider={healthcareProvider} />
            </TabsContent>
            <TabsContent value="presentation">
              <div className="flex flex-col gap-4">
                <PresentationCard healthcareProvider={healthcareProvider} />
                <ServicesCard healthcareProvider={healthcareProvider} />
              </div>
            </TabsContent>
            <TabsContent value="opening-hours">
              <OpeningHoursCard healthcareProvider={healthcareProvider} />
            </TabsContent>
            <TabsContent value="pricing">
              <div className="flex flex-col gap-4">
                <PricingAndRefundsCard
                  healthcareProvider={healthcareProvider}
                />
                <PaymentsMethodsCard healthcareProvider={healthcareProvider} />
              </div>
            </TabsContent>
            <TabsContent value="reviews">
              <Reviewscard
                healthcareProvider={healthcareProvider}
                patient={patient}
                HaveConsultation={HaveConsultation}
              />
            </TabsContent>

            <div className="flex flex-col justify-start">
              <BookAppointmentCard healthcareProvider={healthcareProvider} />
            </div>
          </div>
        </Container>
      </Tabs>
    </div>
  );
}
