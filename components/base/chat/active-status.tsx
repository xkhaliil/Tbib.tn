"use client";

import { useActiveChannel } from "@/hooks/use-active-channel";

export function ActiveStatus() {
  useActiveChannel();

  return null;
}
