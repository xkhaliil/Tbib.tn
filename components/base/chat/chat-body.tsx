"use client";

import React from "react";

import Image from "next/image";
import { getCurrentSession } from "@/actions/auth";
import { getConversationById } from "@/actions/conversation";
import { markMessageAsSeen } from "@/actions/message";
import { ExtendedUser } from "@/next-auth";
import { Message as MessageType } from "@/types";
import { find } from "lodash";

import { pusherClient } from "@/lib/pusher";

import { CurrentUserMessage } from "./current-user-message";
import { Message } from "./message";

interface ChatBodyProps {
  conversation: Awaited<ReturnType<typeof getConversationById>>;
  currentUser: Awaited<ReturnType<typeof getCurrentSession>>;
  initialMessages: MessageType[];
}

export function ChatBody({
  conversation,
  currentUser,
  initialMessages,
}: ChatBodyProps) {
  const [messages, setMessages] =
    React.useState<MessageType[]>(initialMessages);
  const bottomRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    pusherClient.subscribe(`conversation-${conversation?.id}`);
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });

    const messageHandler = (message: MessageType) => {
      setMessages((currentMessages) => {
        if (find(currentMessages, { id: message.id })) {
          return currentMessages;
        }
        return [...currentMessages, message];
      });

      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    pusherClient.bind("messages:new", messageHandler);

    return () => {
      pusherClient.unsubscribe(`conversation-${conversation?.id}`);
      pusherClient.unbind("messages:new");
    };
  }, [conversation?.id]);

  const handleSeen = React.useCallback(async () => {
    await markMessageAsSeen(conversation?.id);
  }, [conversation?.id]);

  React.useEffect(() => {
    handleSeen();
  }, [conversation?.id, handleSeen]);

  return (
    <div className="flex h-full w-full flex-col gap-6 overflow-y-auto overflow-x-hidden p-4">
      {messages.map((message, index) => {
        if (currentUser?.id === message.senderId) {
          return (
            <CurrentUserMessage
              key={index}
              message={message}
              currentUser={currentUser as ExtendedUser}
            />
          );
        } else {
          return <Message key={index} message={message} />;
        }
      })}

      {messages.length === 0 && (
        <div className="flex h-full items-center justify-center">
          <div className="flex flex-col items-center space-y-6">
            <Image
              src="/video-call.svg"
              width="300"
              height="300"
              alt="Messages"
            />
            <div className="flex flex-col items-center space-y-1">
              <p className="text-center text-xl font-bold tracking-tight text-slate-600">
                Looks like you have no messages.
              </p>
              <span className="text-sm text-muted-foreground">
                Send a message to get started
              </span>
            </div>
          </div>
        </div>
      )}
      <div ref={bottomRef} className="pt-6" />
    </div>
  );
}
