import React from "react";

import Link from "next/link";
import { getCurrentSession } from "@/actions/auth";
import { imageFileTypes } from "@/constants";
import { Conversation, Message, Patient, User } from "@prisma/client";
import { format } from "date-fns";

import { cn } from "@/lib/utils";

import { UserAvatar } from "../user-avatar";

interface ChatSidebarItemProps {
  conversation: Conversation & { patient: Patient & { user: User } } & {
    messages: Message[];
  };
}

export async function ChatSidebarItem({ conversation }: ChatSidebarItemProps) {
  const currentUser = await getCurrentSession();
  const lastMessage = conversation.messages[conversation.messages.length - 1];
  return (
    <Link href={`/hp/dashboard/messages/conversations/${conversation.id}`}>
      <div className="relative flex w-full cursor-pointer items-center space-x-3 rounded-xl px-2.5 py-4 transition hover:bg-muted">
        <UserAvatar
          selectedUser={conversation.patient.user}
          className="h-11 w-11"
        />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <p className="text-sm font-medium text-foreground">
                  {conversation.patient.user.name}
                </p>
                <p
                  className={cn(
                    "max-w-[200px] truncate text-xs",
                    lastMessage?.seenIds.includes(currentUser?.id || "")
                      ? "text-muted-foreground"
                      : "font-semibold text-foreground",
                    lastMessage?.senderId === currentUser?.id &&
                      "font-normal text-muted-foreground",
                  )}
                >
                  {lastMessage.file &&
                  imageFileTypes.includes(lastMessage.fileType || "")
                    ? "Sent an image"
                    : lastMessage.file &&
                        lastMessage.fileType === "application/pdf"
                      ? "Sent an attachment"
                      : lastMessage.content || "Start a conversation"}
                </p>
              </div>
              <span className="text-xs text-muted-foreground">
                {format(new Date(conversation.lastMessageAt), "HH:mm")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
