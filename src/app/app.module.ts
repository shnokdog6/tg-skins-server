import { Module } from "@nestjs/common";
import { CaseModule } from "../case/case.module";
import { ItemModule } from "../item/item.module";
import { PrismaModule } from "../prisma/prisma.module";
import { ServeStaticModule } from "../serve-static/serve-static.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
    imports: [ServeStaticModule, PrismaModule, CaseModule, ItemModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
