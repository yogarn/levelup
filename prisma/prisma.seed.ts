import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

async function main() {
    const user = await prisma.role.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            name: "user"
        }
    });
    const admin = await prisma.role.upsert({
        where: { id: 2 },
        update: {},
        create: {
            id: 2,
            name: "admin"
        }
    });
    console.log({ user, admin });
}

main()
    .catch(async (e) => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
