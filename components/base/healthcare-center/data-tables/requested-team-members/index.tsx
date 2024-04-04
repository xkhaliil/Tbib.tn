import React from "react";

import { specialties } from "@/constants";
import { faker } from "@faker-js/faker";

import { columns } from "./columns";
import { DataTable } from "./data-table";

const teamMembers = Array.from({ length: 21 }, () => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  image: faker.image.avatar(),
  email: faker.internet.email(),
  speciality: faker.helpers.arrayElement(
    specialties.flatMap((s) => s.specialties),
  ),
  requestedAt: faker.date.recent(),
}));

export function RequestedTeamMembersDataTable() {
  return <DataTable data={teamMembers} columns={columns} />;
}
