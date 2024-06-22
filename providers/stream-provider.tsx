"use client";

import React from "react";

import { getToken } from "@/actions/video-calls";
import {
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-sdk";
import { Loader2Icon, LoaderIcon } from "lucide-react";
import { nanoid } from "nanoid";

import { useCurrentUser } from "@/hooks/use-current-user";

import { Spinner } from "@/components/ui/spinner";

const API_KEY = process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY;

interface StreamProviderProps {
  children: React.ReactNode;
}

export function StreamProvider({ children }: StreamProviderProps) {
  const videoClient = useInitializeVideoClient();

  if (!videoClient) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner className="mx-auto text-blue-600" size="xl" />
      </div>
    );
  }

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
}

function useInitializeVideoClient() {
  const user = useCurrentUser();
  const [videoClient, setVideoClient] =
    React.useState<StreamVideoClient | null>(null);

  React.useEffect(() => {
    let streamUser: User;

    if (user?.id) {
      streamUser = {
        id: user.id,
        name: user.name || user.id,
        image: user.image || undefined,
      };
    } else {
      const id = nanoid();
      streamUser = {
        id,
        type: "guest",
        name: `Guest ${id}`,
      };
    }

    const apiKey = process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY;

    if (!apiKey) {
      throw new Error("Stream API key not set");
    }

    const client = new StreamVideoClient({
      apiKey,
      user: streamUser,
      tokenProvider: user?.id ? getToken : undefined,
    });

    setVideoClient(client);

    return () => {
      client.disconnectUser();
      setVideoClient(null);
    };
  }, [user?.id, user?.name, user?.image]);

  return videoClient;
}
