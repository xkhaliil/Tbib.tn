import { faker } from "@faker-js/faker";
import { BloodType, Patient, PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

function newObjectId() {
  const timestamp = Math.floor(new Date().getTime() / 1000).toString(16);
  const objectId =
    timestamp +
    "xxxxxxxxxxxxxxxx"
      .replace(/[x]/g, () => {
        return Math.floor(Math.random() * 16).toString(16);
      })
      .toLowerCase();

  return objectId;
}

async function main() {
  const amountOfUsers = 4;
  const users: User[] = [];
  const patients: Patient[] = [];

  for (let i = 0; i < amountOfUsers; i++) {
    const name = faker.person.fullName();

    const user: User = {
      id: newObjectId(),
      name: name,
      email: faker.internet.email(),
      gender: faker.helpers.arrayElement(["MALE", "FEMALE"]),
      dateOfBirth: faker.date.between({ from: "1980-01-01", to: "2003-01-01" }),
      phone: faker.helpers.fromRegExp(/+216[0-9]{8}/),
      city: faker.location.city(),
      state: faker.location.state(),
      postalCode: faker.helpers.fromRegExp(/[0-9]{4}/),
      bio: faker.lorem.sentence(),
      emailVerified: new Date(),
      image: faker.image.avatar(),
      password: faker.internet.password(),
      createdAt: new Date(),
      updatedAt: new Date(),
      role: "PATIENT",
      isTwoFactorEnabled: false,
      seenMessagesIds: [],
    };

    const patient: Patient = {
      id: newObjectId(),
      userId: user.id,
      allergies: [],
      chronicDiseases: [],
      vaccinations: [],
      surgeries: [],
      familyHistory: "",
      bloodType: faker.helpers.enumValue(BloodType),
      weight: faker.number.int({ min: 50, max: 100 }),
      height: faker.number.int({ min: 150, max: 200 }),
      bmi: faker.number.float({ min: 18, max: 30 }),
      occupation: faker.person.jobTitle(),
    };

    users.push(user);
    patients.push(patient);
  }

  const addUsers = async () => await prisma.user.createMany({ data: users });
  const addPatients = async () =>
    await prisma.patient.createMany({ data: patients });

  await addUsers();
  await addPatients();
}

main()
  .then(() => {
    console.log("Data seeded successfully");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
