"use client";

import React from "react";

import { useRouter } from "next/navigation";
import { Role } from "@prisma/client";
import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { LayoutList, Users } from "lucide-react";

import { cn } from "@/lib/utils";

import { useCurrentUser } from "@/hooks/use-current-user";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Spinner } from "../ui/spinner";
import { EndCallButton } from "./end-call-button";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

export function VideoConsultationRoom() {
  const user = useCurrentUser();
  const router = useRouter();
  const [layout, setLayout] = React.useState<CallLayoutType>("speaker-left");
  const [showParticipants, setShowParticipants] = React.useState(false);
  const { useCallCallingState } = useCallStateHooks();

  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) return <Spinner />;

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };
  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="relative flex size-full items-center justify-center">
        <div className=" flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        <div
          className={cn("ml-2 hidden h-[calc(100vh-85px)]", {
            "show-block": showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>

      <div className="fixed bottom-0 flex w-full items-center gap-5">
        <EndCallButton />
        <CallControls
          onLeave={() => {
            if (user?.role === Role.HEALTHCARE_PROVIDER) {
              router.push("/hp/dashboard");
            } else {
              router.push("/patient/dashboard");
            }
          }}
        />
      </div>
    </section>
  );
}
