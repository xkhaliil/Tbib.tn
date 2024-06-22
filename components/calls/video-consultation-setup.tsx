"use client";

import React from "react";

import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";

import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

interface VideoConsultationSetupProps {
  setIsSetupComplete: (value: boolean) => void;
}

export function VideoConsultationSetup({
  setIsSetupComplete,
}: VideoConsultationSetupProps) {
  const [isMicCamToggledOn, setIsMicCamToggledOn] = React.useState(false);

  const call = useCall();

  if (!call) throw new Error("Call not found");

  React.useEffect(() => {
    if (isMicCamToggledOn) {
      call?.camera?.disable();
      call?.microphone?.disable();
    } else {
      call?.camera?.enable();
      call?.microphone?.enable();
    }
  }, [isMicCamToggledOn, call?.camera, call?.microphone]);
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold tracking-tight">
        Video Consultation Setup
      </h1>
      <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3">
        <div className="flex items-center justify-center gap-2 font-medium">
          <Checkbox
            checked={isMicCamToggledOn}
            // @ts-ignore
            onCheckedChange={(value) => setIsMicCamToggledOn(value)}
          />
          Join with mic and camera off
        </div>
        <DeviceSettings />
      </div>

      <Button
        variant="blue"
        size="lg"
        onClick={() => {
          call.join();
          setIsSetupComplete(true);
        }}
      >
        Join Call
      </Button>
    </div>
  );
}
