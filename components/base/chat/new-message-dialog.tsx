"use client";

import React from "react";

import { useRouter } from "next/navigation";
import { getAllConversationsForHP } from "@/actions/conversation";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface NewMessageDialogProps {
  conversations: Awaited<ReturnType<typeof getAllConversationsForHP>>;
}

export function NewMessageDialog({ conversations }: NewMessageDialogProps) {
  const router = useRouter();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="blue" size="sm" className="gap-1.5 rounded-full">
          <PlusCircledIcon className="h-4 w-4" />
          New message
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-xl gap-0 p-0 outline-none">
        <DialogHeader className="px-4 pb-4 pt-5">
          <DialogTitle>New message</DialogTitle>
          <DialogDescription>
            Search for a patient to start a new conversation.
          </DialogDescription>
        </DialogHeader>
        <Command className="overflow-hidden rounded-t-none border-t bg-transparent">
          <CommandInput placeholder="Search for a conversation..." />
          <CommandList>
            <CommandEmpty>No conversations found.</CommandEmpty>
            <CommandGroup className="p-2">
              {Array.isArray(conversations) &&
                conversations.map((conversation) => (
                  <CommandItem
                    key={conversation.id}
                    onSelect={() => {
                      router.push(
                        `/hp/dashboard/messages/conversations/${conversation.id}`,
                      );
                    }}
                  >
                    <div className="relative flex w-full cursor-pointer items-center space-x-3 rounded-xl px-2.5 py-4">
                      <Avatar className="h-11 w-11">
                        <AvatarImage
                          src={
                            conversation.patient.user.image ??
                            "/placeholder.svg"
                          }
                          alt={conversation.patient.user.name}
                        />
                        <AvatarFallback>
                          <span className="text-xl">
                            {conversation.patient.user.name
                              .charAt(0)
                              .toUpperCase()}
                          </span>
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="focus:outline-none">
                          <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                              <p className="text-sm font-medium text-foreground">
                                {conversation.patient.user.name}
                              </p>
                              <p className="max-w-[200px] truncate text-xs text-muted-foreground">
                                {conversation.messages[0]?.content ??
                                  "No messages"}
                              </p>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {format(
                                new Date(conversation.lastMessageAt),
                                "HH:mm",
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
