import { Module } from "@nestjs/common";
import { CaseModule } from "../case/case.module";
import { ItemModule } from "../item/item.module";
import { PrismaModule } from "../prisma/prisma.module";
import { RarityModule } from "../rarity/rarity.module";
import { ServeStaticModule } from "../serve-static/serve-static.module";
import { TelegrafModule } from "../telegraf/telegraf.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "../config/config.module";
import { AuthModule } from "../auth/auth.module";

@Module({
    imports: [
        ConfigModule,
        AuthModule,
        ServeStaticModule,
        TelegrafModule,
        PrismaModule,
        CaseModule,
        ItemModule,
        RarityModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
