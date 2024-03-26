import React from "react";

import Image from "next/image";
import {
  ActivitySquareIcon,
  BellDotIcon,
  HeartPulseIcon,
  StethoscopeIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Container } from "../container";

export function SecondaryFeatures() {
  return (
    <div className="py-12 pb-32">
      <Container>
        <div className="grid grid-cols-1 gap-y-8 px-12 sm:gap-x-12 lg:grid-cols-2">
          <Image
            src="/images/consultation.jpg"
            alt=""
            width={2000}
            height={500}
            className="h-[650px] w-full rounded-xl object-cover"
          />

          <div className="flex flex-col gap-y-8 p-8">
            <div className="flex flex-col gap-y-4">
              <Image
                src="/illustration-2.svg"
                alt=""
                width={100}
                height={100}
              />
              <h1 className="text-3xl font-bold tracking-tight">
                Experience a revolution in healthcare with our comprehensive
                health management system.
              </h1>

              <p className="text-base text-muted-foreground">
                Oladoc is a platform that connects patients with doctors and
                healthcare providers. We are committed to providing you with the
                best healthcare experience. Here are some of the main features
                of Oladoc.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:grid-rows-2">
              <FeatureCard
                title="Comprehensive Health Management"
                description="A comprehensive health management system that allows you to manage your health records, appointments, and consultations."
                icon={HeartPulseIcon}
                iconColor="text-green-500"
              />
              <FeatureCard
                title="Elite Healthcare Professionals"
                description="Access to a network of elite healthcare professionals, including doctors, dentists, and more."
                icon={StethoscopeIcon}
                iconColor="text-orange-500"
              />
              <FeatureCard
                title="Personalized Health Insights"
                description="Personalized health insights and recommendations based on your health records and consultations."
                icon={ActivitySquareIcon}
                iconColor="text-blue-500"
              />
              <FeatureCard
                title="Appointment Reminders"
                description="Automated appointment reminders and notifications to keep you updated and on track with your healthcare journey."
                icon={BellDotIcon}
                iconColor="text-purple-500"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  iconColor?: string;
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
  iconColor,
}: FeatureCardProps) {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center gap-x-2.5">
        <Icon className={cn("h-6 w-6", iconColor)} />
        <h3 className="text-lg font-semibold tracking-tight ">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
