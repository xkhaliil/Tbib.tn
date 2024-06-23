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
  Text,
} from "@react-email/components";

interface ResetPasswordTemplateProps {
  user: User;
  verificationToken: string;
}

export function ResetPasswordTemplate({
  user,
  verificationToken,
}: ResetPasswordTemplateProps) {
  const resetPasswordLink =
    process.env.NODE_ENV === "production"
      ? `https://oladoc.online/auth/reset-password?token=${verificationToken}`
      : `http://localhost:3000/auth/reset-password?token=${verificationToken}`;
  return (
    <Html>
      <Head />
      <Preview>Reset password for {user.name!}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>
            Reset password for <strong>{user.name}</strong>
          </Heading>
          <Text style={heroText}>
            Hi <strong>{user.name}</strong>, we received a request to reset your
            password. To do so, please click the button below.
          </Text>
          <Section
            style={{
              textAlign: "center",
              marginBottom: "30px",
            }}
          >
            <Button style={button} href={resetPasswordLink}>
              Reset Password
            </Button>
          </Section>
          <Hr style={hr} />
          <Text style={text}>
            If you did not request a password reset, no further action is
            required.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
  maxWidth: "600px",
  margin: "0 auto",
};

const h1 = {
  color: "#1d1c1d",
  fontSize: "36px",
  fontWeight: "700",
  margin: "30px 0",
  padding: "0",
  lineHeight: "42px",
};

const heroText = {
  fontSize: "20px",
  lineHeight: "28px",
  marginBottom: "30px",
};

const text = {
  color: "#1d1c1d",
  fontSize: "14px",
  lineHeight: "24px",
};

const button = {
  display: "inline-block",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "0.375rem",
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  fontWeight: "500",
  whiteSpace: "nowrap",
  backgroundColor: "#171717",
  textDecoration: "none",
  color: "#ffffff",
  padding: "0.5rem 1rem",
};

const hr = {
  borderColor: "#e5e5e5",
  margin: "20px 0",
};
