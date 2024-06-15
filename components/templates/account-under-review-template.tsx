import React from "react";

import { User } from "@prisma/client";
import {
  Body,
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

interface AccountUnderReviewTemplateProps {
  user: User;
}

export function AccountUnderReviewTemplate({
  user,
}: AccountUnderReviewTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>Your account is under review</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="w-full max-w-[600px]">
            <Section className="flex items-center justify-center">
              <Text className="text-3xl font-bold tracking-tighter text-blue-600">
                Oladoc
              </Text>
            </Section>
            <Heading className="text-4xl font-bold text-blue-600">
              Your account is under review
            </Heading>
            <Text className="mt-4 text-base text-muted-foreground">
              Hi <strong>{user.name}</strong>, Your account is currently under
              review. You will receive an email once your account is verified.
            </Text>
            <Hr className="mx-0 my-[26px] w-full border" />
            <Text className="text-sm text-muted-foreground">
              If you did not create an account, no further action is required.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
