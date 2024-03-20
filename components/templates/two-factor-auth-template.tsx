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

interface TwoFactorAuthTemplateProps {
  user: User;
  verificationCode: string;
}

export function TwoFactorAuthTemplate({
  user,
  verificationCode,
}: TwoFactorAuthTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>Two factor authentication code for {user.name!}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Two factor authentication code</Heading>
          <Text style={heroText}>
            Hi <strong>{user.name}</strong>, here is your two factor
            authentication code:
          </Text>

          <Section
            style={{
              textAlign: "center",
              marginBottom: "30px",
            }}
          >
            <Text style={{ fontSize: "32px", fontWeight: "700" }}>
              {verificationCode}
            </Text>
          </Section>
          <Hr style={hr} />
          <Text style={text}>
            If you did not request a two factor authentication code, no further
            action is required.
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

const hr = {
  borderColor: "#e5e5e5",
  margin: "20px 0",
};
