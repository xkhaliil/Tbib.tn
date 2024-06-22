"use client";

import { useRouter } from "next/navigation";
import { Role } from "@prisma/client";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";

import { useCurrentUser } from "@/hooks/use-current-user";

import { Button } from "../ui/button";

export function EndCallButton() {
  const user = useCurrentUser();
  const call = useCall();
  const router = useRouter();

  if (!call)
    throw new Error(
      "useStreamCall must be used within a StreamCall component.",
    );

  // https://getstream.io/video/docs/react/guides/call-and-participant-state/#participant-state-3
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const isMeetingOwner =
    localParticipant &&
    call.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

  if (!isMeetingOwner) return null;

  const endCall = async () => {
    await call.endCall();
    if (user?.role === Role.HEALTHCARE_PROVIDER) {
      router.push("/hp/dashboard");
    } else {
      router.push("/patient/dashboard");
    }
  };

  return (
    <Button onClick={endCall} variant="destructive">
      End call for everyone
    </Button>
  );
}
