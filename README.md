# E-health Appointment Booking Application

## Prerequisites

Node.js version 18.17 or higher is required to run this application.

## Getting Started

### First, clone the repository:

```bash
git clone https://github.com/ahmedmayara/e-health-appointment-booking-app.git
```

### Then, install the dependencies:

```bash
npm install
```

### Set up your environment variables:

```js
DATABASE_URL=
AUTH_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
RESEND_API_KEY=
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
```

### Set up Prisma:

```bash
npx prisma generate
npx prisma db push
```

### Finally, run the development server:

```bash
npm run dev
```

## Available Commands

| Command       | Description                                      |
| ------------- | ------------------------------------------------ |
| `npm run dev` | Runs the development server on `localhost:3000`. |
