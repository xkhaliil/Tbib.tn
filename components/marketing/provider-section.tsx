import React from "react";

import Image from "next/image";

import { Container } from "@/components/container";

import { Button } from "../ui/button";

export function ProviderSection() {
  return (
    <div className="py-20 sm:pt-32">
      <Container>
        <div className="mx-auto max-w-4xl md:text-center">
          <div className="flex flex-col items-center gap-y-8">
            <Image src="/illustration-3.svg" alt="" width={100} height={100} />
            <h2 className="text-center text-3xl font-bold leading-relaxed tracking-tight text-blue-600 sm:text-4xl">
              Oladoc for healthcare providers
            </h2>
          </div>
          <p className="mt-4 text-center text-lg tracking-tight text-muted-foreground">
            Are you a healthcare provider interested in reaching more patients?
            Oladoc is a platform that connects patients with doctors and
            healthcare providers. We are committed to providing you with the
            best healthcare experience.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 lg:px-12">
          <div className="flex flex-col items-start justify-center">
            <h3 className="text-3xl font-bold tracking-tight lg:pb-12">
              Join our network of healthcare professionals
            </h3>

            <ul className="mt-16 text-base text-muted-foreground lg:mt-0 lg:w-full lg:max-w-2xl">
              <FeatureListItem
                title="Reach more patients"
                description="Join our network of healthcare professionals to reach more patients and grow your practice."
              />
              <FeatureListItem
                title="Verified Reviews"
                description="Get verified reviews from patients to strengthen your reputation and credibility."
              />
              <FeatureListItem
                title="Schedule appointments"
                description="Manage appointments and consultations with patients through our platform, and grow your practice."
              />
            </ul>

            <div className="my-12 lg:mb-0 lg:pt-6">
              <Button variant="blue" size="lg" className="h-12 rounded-2xl">
                Join our network
              </Button>
            </div>
          </div>
          <div className="flex justify-center lg:w-full lg:justify-end">
            <Image
              src="/images/doctors-discussing-work.jpg"
              alt=""
              width={2000}
              height={500}
              className="h-[650px] w-full rounded-xl object-cover"
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

interface FeatureListItemProps {
  title: string;
  description: string;
}

export function FeatureListItem({ title, description }: FeatureListItemProps) {
  return (
    <li className="group mt-10 first:mt-0">
      <div>
        <div className="relative pt-10 before:absolute before:left-0 before:top-0 before:h-px before:w-6 before:bg-blue-600 after:absolute after:left-8 after:right-0 after:top-0 after:h-px after:bg-blue-600/10 group-first:pt-0 group-first:before:hidden group-first:after:hidden">
          <strong className="font-semibold text-blue-600">{title} </strong>
          {description}
        </div>
      </div>
    </li>
  );
}
