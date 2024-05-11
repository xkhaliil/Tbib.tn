"use client";

import React from "react";

import Link from "next/link";
import { sendNewMessage } from "@/actions/message";
import { SendNewMessageSchema, SendNewMessageSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon } from "@radix-ui/react-icons";
import { PaperclipIcon, SendHorizontalIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";

import { useUploadFileDialog } from "@/hooks/use-upload-file-dialog";

import { Button, buttonVariants } from "@/components/ui/button";
import { Form, FormControl, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { EmojiPicker } from "./emoji-picker";
import { UploadFileDialog } from "./upload-file-dialog";

interface ChatBottomBarProps {
  conversationId: string;
  senderId: string | undefined;
}

interface ChatBottomBarButtonProps {
  icon: React.ElementType;
  tooltip: string;
}

const LEFT_BUTTONS: ChatBottomBarButtonProps[] = [
  {
    icon: ImageIcon,
    tooltip: "Send an image",
  },
  {
    icon: PaperclipIcon,
    tooltip: "Attach a file",
  },
];

export function ChatBottomBar({
  conversationId,
  senderId,
}: ChatBottomBarProps) {
  const [file, setFile] = React.useState<File | undefined>(undefined);
  const uploadFileDialog = useUploadFileDialog();
  const sendNewMessageForm = useForm<SendNewMessageSchemaType>({
    resolver: zodResolver(SendNewMessageSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (data: SendNewMessageSchemaType) => {
    await sendNewMessage(
      data,
      file?.name,
      file?.type,
      conversationId,
      senderId!,
    );
    sendNewMessageForm.reset();
  };

  return (
    <div className="flex w-full items-center justify-between gap-2 border-t bg-white p-2">
      <div className="flex">
        {LEFT_BUTTONS.map((button, index) => (
          <TooltipProvider key={index}>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "h-9 w-9",
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    uploadFileDialog.setOpen(true);
                  }}
                >
                  {React.createElement(button.icon, {
                    className: "h-5 w-5 text-muted-foreground",
                  })}
                </Link>
              </TooltipTrigger>
              <TooltipContent side="top" align="center">
                {button.tooltip}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
      <div key="input" className="relative w-full">
        <Form {...sendNewMessageForm}>
          <form
            id="send-new-message-form"
            onSubmit={sendNewMessageForm.handleSubmit(onSubmit)}
          >
            <FormField
              control={sendNewMessageForm.control}
              name="content"
              render={({ field }) => (
                <FormControl>
                  <div className="relative w-full">
                    <Input
                      {...field}
                      autoComplete="off"
                      name="content"
                      placeholder="Type a message"
                    />
                    <EmojiPicker
                      onChange={(emoji) => {
                        sendNewMessageForm.setValue(
                          "content",
                          sendNewMessageForm.getValues("content") + emoji,
                        );
                      }}
                      className="absolute right-1 top-0.5"
                    />
                  </div>
                </FormControl>
              )}
            />

            <FormField
              control={sendNewMessageForm.control}
              name="file"
              render={({ field }) => (
                <FormControl>
                  <UploadFileDialog
                    value={field.value}
                    onChange={field.onChange}
                    setFile={(file) => {
                      setFile(file);
                    }}
                  />
                </FormControl>
              )}
            />
          </form>
        </Form>
      </div>

      <Button
        variant="blue"
        size="sm"
        type="submit"
        form="send-new-message-form"
        disabled={
          sendNewMessageForm.formState.isSubmitting ||
          !sendNewMessageForm.formState.isDirty
        }
      >
        Send
      </Button>
    </div>
  );
}
