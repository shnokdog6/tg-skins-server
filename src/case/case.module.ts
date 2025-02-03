import { Module } from "@nestjs/common";
import { FileModule } from "../file/file.module";
import { PrismaModule } from "../prisma/prisma.module";
import { CaseController } from "./case.controller";
import { CaseService } from "./case.service";

@Module({
    imports: [PrismaModule, FileModule],
    providers: [CaseService],
    controllers: [CaseController],
})
export class CaseModule {}
