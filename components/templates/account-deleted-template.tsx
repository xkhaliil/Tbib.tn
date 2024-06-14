import React from "react";

import { User } from "@prisma/client";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface AccountDeletedTemplateProps {
  user: User;
}

export function AccountDeletedTemplate({ user }: AccountDeletedTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>Your account is deleted</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="w-full max-w-[600px]">
            <Section className="flex items-center justify-center">
              <Text className="ml-2 text-3xl font-bold tracking-tighter text-blue-600">
                Oladoc
              </Text>
            </Section>
            <Heading className="text-4xl font-bold text-blue-600">
              Your account is deleted
            </Heading>
            <Text className="mt-4 text-base text-muted-foreground">
              Hi <strong>{user.name}</strong>, Your account has been deleted. It
              seems like you've been rejected by our system. If you think this
              is a mistake, please contact support.
            </Text>
            <Hr className="mx-0 my-[26px] w-full border" />
            <Button
              className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-600/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              href="mailto:oladoc.customerservice@gmail.com"
            >
              Contact support
            </Button>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
