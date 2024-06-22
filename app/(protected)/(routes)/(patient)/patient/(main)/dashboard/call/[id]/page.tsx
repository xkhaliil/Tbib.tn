"use client";

import React from "react";

import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";

import { useGetCallById } from "@/hooks/use-get-call-by-id";

import { Spinner } from "@/components/ui/spinner";
import { Sidebar } from "@/components/base/navigation/sidebar";
import { VideoConsultationRoom } from "@/components/calls/video-consultation-room";
import { VideoConsultationSetup } from "@/components/calls/video-consultation-setup";

interface ConversationPageProps {
  params: {
    id: string;
  };
}

export default function ConversationPage({ params }: ConversationPageProps) {
  const { call, isCallLoading } = useGetCallById(params?.id);
  const [isSetupComplete, setIsSetupComplete] = React.useState(false);

  if (isCallLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner className="text-blue-600" size="lg" />
      </div>
    );
  }

  return (
    <div className="grid">
      <div className="flex h-screen flex-col items-center justify-center">
        <StreamCall call={call}>
          <StreamTheme>
            {!isSetupComplete ? (
              <VideoConsultationSetup setIsSetupComplete={setIsSetupComplete} />
            ) : (
              <VideoConsultationRoom />
            )}
          </StreamTheme>
        </StreamCall>
      </div>
    </div>
  );
}
