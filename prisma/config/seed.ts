import { PrismaClient } from "@prisma/client";
import { rarities } from "./rarity.init";

const prisma = new PrismaClient();

async function main() {
    for (const rarity of rarities) {
        await prisma.rarity.create({
            data: rarity,
        });
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
