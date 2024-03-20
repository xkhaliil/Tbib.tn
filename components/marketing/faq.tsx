import React from "react";

import { Container } from "@/components/container";

export function FAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="border border-t py-20 sm:py-32"
    >
      <Container className="max-w-[1400px]">
        <div className="max-w-2xl lg:mx-0">
          <h2
            id="faq-title"
            className="text-3xl font-bold tracking-tight text-blue-600 sm:text-4xl"
          >
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg tracking-tight text-muted-foreground">
            Here are some of the most common questions we get asked about
            Oladoc.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
        >
          <li>
            <ul role="list" className="flex flex-col gap-y-8">
              <li>
                <h3 className="text-lg font-medium leading-7 text-foreground">
                  What is Oladoc?
                </h3>
                <p className="mt-4 text-sm text-muted-foreground">
                  Oladoc is a platform that connects patients with doctors and
                  healthcare providers. We are committed to providing you with
                  the best healthcare experience.
                </p>
              </li>
              <li>
                <h3 className="text-lg font-medium leading-7 text-foreground">
                  How do I get started?
                </h3>
                <p className="mt-4 text-sm text-muted-foreground">
                  You can get started by signing up for an account on our
                  website. Once you have an account, you can start booking
                  appointments and using our other features.
                </p>
              </li>
              <li>
                <h3 className="text-lg font-medium leading-7 text-foreground">
                  How do I book an appointment?
                </h3>
                <p className="mt-4 text-sm text-muted-foreground">
                  You can book an appointment by logging into your account and
                  using our appointment booking feature. You can search for
                  doctors by name, location, or specialty, and then book an
                  appointment with them.
                </p>
              </li>
            </ul>
          </li>
          <li>
            <ul role="list" className="flex flex-col gap-y-8">
              <li>
                <h3 className="text-lg font-medium leading-7 text-foreground">
                  How do I cancel an appointment?
                </h3>
                <p className="mt-4 text-sm text-muted-foreground">
                  You can cancel an appointment by logging into your account and
                  using our appointment management feature. You can view your
                  upcoming appointments and cancel them from there.
                </p>
              </li>
              <li>
                <h3 className="text-lg font-medium leading-7 text-foreground">
                  How do I get a prescription?
                </h3>
                <p className="mt-4 text-sm text-muted-foreground">
                  You can get a prescription by booking an appointment with a
                  doctor and discussing your symptoms with them. If the doctor
                  determines that you need a prescription, they will write one
                  for you.
                </p>
              </li>
              <li>
                <h3 className="text-lg font-medium leading-7 text-foreground">
                  Is Oladoc free to use?
                </h3>
                <p className="mt-4 text-sm text-muted-foreground">
                  Oladoc is free to use for patients. Doctors and healthcare
                  providers pay a fee to use our platform.
                </p>
              </li>
            </ul>
          </li>
          <li>
            <ul role="list" className="flex flex-col gap-y-8">
              <li>
                <h3 className="text-lg font-medium leading-7 text-foreground">
                  How do I contact support?
                </h3>
                <p className="mt-4 text-sm text-muted-foreground">
                  You can contact support by sending us an email.
                </p>
              </li>
              <li>
                <h3 className="text-lg font-medium leading-7 text-foreground">
                  What happens if I miss my appointment?
                </h3>
                <p className="mt-4 text-sm text-muted-foreground">
                  You can contact your doctor to reschedule your appointment.
                </p>
              </li>
              <li>
                <h3 className="text-lg font-medium leading-7 text-foreground">
                  I forgot my password. How can I reset it?
                </h3>
                <p className="mt-4 text-sm text-muted-foreground">
                  You can reset your password by clicking on the "Forgot
                  password" link on the sign-in page and following the
                  instructions.
                </p>
              </li>
            </ul>
          </li>
        </ul>
      </Container>
    </section>
  );
}
