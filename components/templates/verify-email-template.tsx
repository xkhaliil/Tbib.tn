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

interface VerifyEmailTemplateProps {
  user: User;
  verificationToken: string;
}

export function VerifyEmailTemplate({
  user,
  verificationToken,
}: VerifyEmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>Confirm your email address</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="w-full max-w-[600px]">
            <Section className="flex items-center justify-center">
              <Text className="text-3xl font-bold tracking-tighter text-blue-600">
                Oladoc
              </Text>
            </Section>
            <Heading className="text-4xl font-bold text-blue-600">
              Confirm your email address
            </Heading>
            <Text className="mt-4 text-base text-muted-foreground">
              Hi <strong>{user.name}</strong>, To confirm your email address,
              please click the button below.
            </Text>
            <Section className="mb-5 text-center">
              <Button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-600/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                href={`http://localhost:3000/auth/verify?token=${verificationToken}`}
              >
                Verify Email
              </Button>
            </Section>
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
