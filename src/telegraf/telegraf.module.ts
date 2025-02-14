import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TelegrafModule as TF } from "nestjs-telegraf";
import { PrismaModule } from "../prisma/prisma.module";
import { TelegrafService } from "./telegraf.service";

@Module({
    imports: [
        PrismaModule,
        TF.forRootAsync({
            useFactory: async (configService: ConfigService<EnvironmentVariables>) => ({
                token: configService.get("TELEGRAM_BOT_TOKEN")!,
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [TelegrafService],
})
export class TelegrafModule {}
