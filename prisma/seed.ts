import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await hash("admin123", 10);

  const admin = await prisma.user.create({
    data: {
      email: "admin@withshakilsir.com",
      name: "Admin User",
      password: adminPassword,
      role: "ADMIN",
      emailVerified: true,
    },
  });

  console.log("Seed data created:", { admin });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
