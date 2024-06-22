"use server";

import { StreamClient } from "@stream-io/node-sdk";

import { getCurrentSession } from "../auth";

const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY;
const STREAM_API_SECRET = process.env.STREAM_VIDEO_API_SECRET;

export async function getToken() {
  const user = await getCurrentSession();

  if (!STREAM_API_KEY) throw new Error("Stream API key secret is missing");
  if (!STREAM_API_SECRET) throw new Error("Stream API secret is missing");

  const streamClient = new StreamClient(STREAM_API_KEY, STREAM_API_SECRET);

  const expirationTime = Math.floor(Date.now() / 1000) + 3600;
  const issuedAt = Math.floor(Date.now() / 1000) - 60;

  const token = streamClient.createToken(
    user?.id || "unknown",
    expirationTime,
    issuedAt,
  );

  return token;
}
