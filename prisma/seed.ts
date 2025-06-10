import { PrismaClient } from "@prisma/client";
import { seedServices } from "~/prisma/seeds/services";

const client = new PrismaClient();

async function startSeedingMethod(callback: (client: PrismaClient) => Promise<void>, message: { start: string; success: string; error: string }) {
  console.info(`🌱  ${message.start}...`);

  try {
    await callback(client);
    console.info(`🌲  ${message.success}!`);
  }
  catch (e) {
    console.error(`❌  ${message.error}!`, e);
  }
}

async function main() {
  await startSeedingMethod(seedServices, {
    start: "Start seeding services",
    success: "Services seeded",
    error: "An error occurred while seeding services",
  });
}

main()
  .then(async () => {
    await client.$disconnect();
  })
  .catch(async () => {
    await client.$disconnect();
    process.exit(1);
  });
