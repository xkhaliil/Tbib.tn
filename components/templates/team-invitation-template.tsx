import React from "react";

import {
  getHealthcareCenterByUserId,
  getUserByHealthcareProviderId,
} from "@/actions/auth";
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

interface TeamInvitationTemplateProps {
  healthcareCenter: Awaited<ReturnType<typeof getHealthcareCenterByUserId>>;
  healthcareProvider: Awaited<ReturnType<typeof getUserByHealthcareProviderId>>;
}

export function TeamInvitationTemplate({
  healthcareCenter,
  healthcareProvider,
}: TeamInvitationTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>Team Invitation</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="w-full max-w-[600px]">
            <Section className="flex items-center justify-center">
              <Text className="text-3xl font-bold tracking-tighter text-blue-600">
                Oladoc
              </Text>
            </Section>
            <Heading className="text-4xl font-bold text-blue-600">
              Team Invitation
            </Heading>
            <Text className="mt-4 text-base text-muted-foreground">
              Hi <strong>{healthcareProvider?.name}</strong>, You have been
              invited to join the team of{" "}
              <strong>{healthcareCenter?.user.name}</strong>.
            </Text>
            <Section className="mb-5 text-center">
              <Button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-600/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                href="http://localhost:3000/hp/dashboard"
              >
                Accept Invitation
              </Button>
            </Section>
            <Hr className="mx-0 my-[26px] w-full border" />
            <Text className="text-sm text-muted-foreground">
              No further action is required.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
