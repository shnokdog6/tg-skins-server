import { Module } from "@nestjs/common";
import { FileModule } from "../file/file.module";
import { PrismaModule } from "../prisma/prisma.module";
import { ItemController } from "./item.controller";
import { ItemService } from "./item.service";

@Module({
    imports: [PrismaModule, FileModule],
    providers: [ItemService],
    controllers: [ItemController],
})
export class ItemModule {}
