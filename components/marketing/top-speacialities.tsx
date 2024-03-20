import React from "react";

import { BoneIcon, BrainIcon, EyeIcon, HeartHandshakeIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Container } from "@/components/container";

export function TopSpeacialities() {
  return (
    <div className="py-20 sm:py-32">
      <Container>
        <div className="mx-auto max-w-4xl md:text-center">
          <div className="flex flex-col items-center">
            <h2 className="text-center text-3xl font-bold leading-relaxed tracking-tight text-blue-600 sm:text-4xl">
              Top Specialities
            </h2>
            <p className="mt-4 text-center text-lg tracking-tight text-muted-foreground">
              Here are some of the top specialities that we offer.
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-4">
          <SpecialityCard
            title="Cardiology"
            description="The branch of medicine that deals with diseases and abnormalities of the heart."
            icon={HeartHandshakeIcon}
            iconColor="text-red-500"
          />
          <SpecialityCard
            title="Neurology"
            description="The branch of medicine that deals with the anatomy, functions, and organic disorders of nerves and the nervous system."
            icon={BrainIcon}
            iconColor="text-purple-500"
          />
          <SpecialityCard
            title="Ophthalmology"
            description="The branch of medicine that deals with the anatomy, functions, and diseases of the eye."
            icon={EyeIcon}
            iconColor="text-green-500"
          />
          <SpecialityCard
            title="Orthopedics"
            description="The branch of medicine that deals with the skeletal system and associated muscles, joints, and ligaments."
            icon={BoneIcon}
            iconColor="text-gray-500"
          />
        </div>
      </Container>
    </div>
  );
}

interface SpecialityCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  iconColor?: string;
}

export function SpecialityCard({
  title,
  description,
  icon: Icon,
  iconColor,
}: SpecialityCardProps) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-blue-200 bg-blue-50 p-6">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-blue-200 bg-white">
        <Icon className={cn("h-8 w-8", iconColor)} />
      </div>
      <h3 className="mt-6 text-xl font-bold tracking-tight">{title}</h3>
      <p className="mt-2 text-center text-muted-foreground">{description}</p>
    </div>
  );
}
