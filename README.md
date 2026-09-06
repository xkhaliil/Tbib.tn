
# Tbib.tn — E-health Appointment Booking Application

An e-health platform for booking and managing medical appointments between patients, doctors, and healthcare centers.

![TypeScript](https://img.shields.io/badge/language-TypeScript-blue)
![Stars](https://img.shields.io/github/stars/xkhaliil/Tbib.tn)

## What it does

Tbib.tn lets patients search for doctors and healthcare centers, book and reschedule appointments, and message or video-call their healthcare provider. Healthcare providers and center admins get their own dashboards to manage appointments, absences, opening hours, patient records, and prescriptions. The app also generates PDF prescriptions/documents, sends transactional emails (appointment confirmations, cancellations, verification, password reset, team invitations), and supports role-based auth with two-factor authentication.

## Tech stack

- **Framework:** Next.js 14, React, TypeScript
- **Database/ORM:** Prisma, `@auth/prisma-adapter`
- **Auth:** NextAuth, two-factor authentication
- **UI:** Tailwind CSS, Radix UI, MUI (`@mui/material`, `@mui/x-charts`, `@nivo/pie`), Headless UI
- **Forms:** React Hook Form + `@hookform/resolvers`
- **Realtime/Chat:** Pusher, Knock (`@knocklabs/react`)
- **Email/PDF:** React Email, EmailJS, Fileforge, `@react-pdf/renderer`
- **File uploads:** UploadThing
- **Maps:** custom map/marker/geocoder components for locating healthcare providers

## Getting started

### Prerequisites

Node.js version 18.17 or higher is required to run this application.

### Clone the repository

```bash
git clone https://github.com/xkhaliil/Tbib.tn.git
```

### Install dependencies

```bash
npm install
```

### Set up environment variables

```
DATABASE_URL=
AUTH_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
RESEND_API_KEY=
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
```

### Set up Prisma

```bash
npx prisma generate
npx prisma db push
```

### Run the development server

```bash
npm run dev
```

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Runs the development server on `localhost:3000`. |
| `npm run build` | Builds the app for production. |
| `npm run start` | Runs the production build. |
| `npm run lint` | Runs Next.js lint checks. |
| `npm run pretty` | Formats the codebase with Prettier. |

<!-- TODO: add a screenshot -->

## License

No license file is present in this repository.
