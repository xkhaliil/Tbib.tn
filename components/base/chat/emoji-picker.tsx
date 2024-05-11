"use client";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { SmileIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface EmojiPickerProps {
  onChange: (emoji: string) => void;
  className?: string;
}

export function EmojiPicker({ onChange, className }: EmojiPickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          type="button"
          className={cn("data-[state=open]:bg-accent", className)}
        >
          <SmileIcon className="h-5 w-5 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="right"
        sideOffset={45}
        className="mb-9 border-none bg-transparent shadow-none drop-shadow-none"
      >
        <Picker
          data={data}
          onEmojiSelect={(emoji: any) => onChange(emoji.native)}
          theme="light"
          previewPosition="none"
        />
      </PopoverContent>
    </Popover>
  );
}
