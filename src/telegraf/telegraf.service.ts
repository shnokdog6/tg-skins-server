import { Ctx, Start, Update } from "nestjs-telegraf";
import { Context } from "telegraf";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Update()
@Injectable()
export class TelegrafService {

    constructor(private readonly prismaService: PrismaService) {
    }

    @Start()
    public async start(@Ctx() ctx: Context) {
        await ctx.reply("Welcome");
    }
}