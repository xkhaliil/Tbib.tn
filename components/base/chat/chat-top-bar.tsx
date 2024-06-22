"use client";

import React from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { sendNewMessage } from "@/actions/message";
import { Role, User } from "@prisma/client";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { InfoIcon, VideoIcon } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

import { useCurrentUser } from "@/hooks/use-current-user";

import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { ActiveText } from "./active-text";
import { UserAvatar } from "./user-avatar";

interface ChatTopbarProps {
  selectedUser: User | undefined;
  conversationId: string;
}

export async function ChatTopbar({
  selectedUser,
  conversationId,
}: ChatTopbarProps) {
  const [call, setCall] = React.useState<Call>();

  const client = useStreamVideoClient();
  const user = useCurrentUser();
  const router = useRouter();

  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create meeting");
      const startsAt = new Date(Date.now()).toISOString();
      const description = "Instant Meeting";
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCall(call);

      const appUrl =
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : "https://oladoc.online";
      const meetingLink = `${appUrl}/patient/dashboard/call/${id}`;

      await sendNewMessage(
        { content: meetingLink },
        undefined,
        undefined,
        conversationId,
        user?.id as string,
      );

      router.push(`/hp/dashboard/call/${id}`);

      toast.success("Meeting created successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create meeting");
    }
  };

  return (
    <div className="flex h-16 w-full items-center justify-between border-b bg-white p-4">
      <div className="flex items-center gap-2">
        <UserAvatar selectedUser={selectedUser} />
        <div className="flex flex-col">
          <span className="text-sm font-medium">{selectedUser?.name}</span>
          <ActiveText user={selectedUser} />
        </div>
      </div>

      <div className="flex items-center">
        <Link
          href="#"
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "h-9 w-9",
          )}
        >
          <InfoIcon className="h-5 w-5" />
        </Link>

        {user?.role === Role.HEALTHCARE_PROVIDER && (
          <>
            <Separator orientation="vertical" className="mx-1.5 h-6" />

            <Button
              onClick={createMeeting}
              variant="ghost"
              size="icon"
              className="h-9 w-9"
            >
              <VideoIcon className="h-5 w-5" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

interface MeetingLinkProps {
  call: Call;
}

function MeetingLink({ call }: MeetingLinkProps) {
  const meetingLink =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://oladoc.online";
  return (
    <Link href={`${meetingLink}/hp/dashboard/messages/call//${call.id}`}>
      {meetingLink}/hp/dashboard/messages/call//{call.id}
    </Link>
  );
}
