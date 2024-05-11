import React from "react";

import Image from "next/image";
import Link from "next/link";
import { PdfIcon } from "@/icons/pdf-icon";
import { ExtendedUser } from "@/next-auth";
import { Message as PrismaMessage, User } from "@prisma/client";
import { DownloadIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface CurrentUserMessageProps {
  message: PrismaMessage & {
    sender: User;
  };
  currentUser: ExtendedUser;
}

export function CurrentUserMessage({
  message,
  currentUser,
}: CurrentUserMessageProps) {
  return (
    <div className="flex justify-end">
      <div className="flex items-start gap-2.5">
        <div className="flex w-full max-w-[320px] flex-col gap-1">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-sm font-medium">{currentUser.name}</span>
            <span className="text-xs font-normal text-muted-foreground">
              {format(new Date(message.createdAt), "EEEE, HH:mm")}
            </span>
          </div>
          <div className="leading-1.5 flex flex-col rounded-s-xl rounded-br-xl bg-gray-100 p-4">
            <p
              className={cn(
                "text-sm font-normal",
                message.file && message.content ? "pb-2" : "pb-0",
              )}
            >
              {message.content}
            </p>
            {message.file && message.fileType === "application/pdf" && (
              <div className="flex items-center rounded-xl border bg-gray-50 p-2.5">
                <div className="me-2">
                  <span className="flex items-center gap-2 text-sm font-medium">
                    <PdfIcon className="h-5 w-5 flex-shrink-0" />
                    <span className="max-w-[200px] truncate">
                      {message.fileName}
                    </span>
                  </span>
                </div>
                <div className="inline-flex items-center self-center">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={message.file} target="_blank">
                      <DownloadIcon className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  </Button>
                </div>
              </div>
            )}

            {(message.file && message.fileType === "image/jpeg") ||
              (message.fileType === "image/png" && (
                <div className="group relative my-2.5">
                  <div className="absolute flex h-full w-full items-center justify-center rounded-lg bg-gray-900/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <button className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 hover:bg-white/50 focus:outline-none focus:ring-4 focus:ring-gray-50 dark:text-white">
                      <DownloadIcon className="h-5 w-5" />
                    </button>
                  </div>
                  <Image
                    src={message.file ?? "/placeholder.svg"}
                    width={1000}
                    height={1000}
                    className="rounded-lg"
                    alt="Image"
                  />
                </div>
              ))}
          </div>
        </div>
        <Avatar className="h-8 w-8">
          <AvatarImage src={currentUser.image ?? "/placeholder.svg"} />
          <AvatarFallback>
            {currentUser?.name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
