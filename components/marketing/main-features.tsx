import React from "react";

import Image from "next/image";
import { CalendarIcon } from "@radix-ui/react-icons";
import { FileLock2Icon, ShieldCheckIcon, VideoIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Container } from "@/components/container";

export function MainFeatures() {
  return (
    <div className="border-t py-20 sm:pt-32">
      <Container>
        <div className="mx-auto max-w-4xl md:text-center">
          <div className="flex flex-col items-center gap-y-8">
            <Image src="/illustration.svg" alt="" width={100} height={100} />
            <h2 className="text-center text-3xl font-bold leading-relaxed tracking-tight text-blue-600 sm:text-4xl">
              Exploring healthcare innovation : Spotlight on the main and key
              features of Oladoc
            </h2>
          </div>
          <p className="mt-4 text-center text-lg tracking-tight text-muted-foreground">
            Oladoc is a platform that connects patients with doctors and
            healthcare providers. We are committed to providing you with the
            best healthcare experience. Here are some of the main features of
            Oladoc.
          </p>
        </div>

        <Container>
          <div className="mt-16 grid grid-cols-1 gap-y-8 sm:gap-x-8 lg:grid-cols-3">
            <FeatureCard
              title="Real-time video consultations"
              description="A telemedicine component that allows video or audio consultations between patients and healthcare providers."
              icon={VideoIcon}
              iconColor="text-orange-500"
            />
            <FeatureCard
              title="Book appointments"
              description="A system for booking appointments with healthcare providers, including doctors, dentists, and more."
              icon={CalendarIcon}
              iconColor="text-blue-500"
            />
            <FeatureCard
              title="Secure file sharing"
              description="A system for sharing and storing medical documents, images, and other files securely."
              icon={FileLock2Icon}
              iconColor="text-green-500"
            />
          </div>
        </Container>
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
    <div className="flex flex-col gap-y-4 p-6">
      <div className="flex items-center gap-x-2.5">
        <Icon className={cn("h-6 w-6", iconColor)} />
        <h3 className="text-xl font-bold tracking-tight">{title}</h3>
      </div>
      <p className="text-base tracking-tight text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
