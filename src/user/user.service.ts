import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    public async getByTelegramId(id: number) {
        return this.prismaService.user.findUnique({
            where: {
                telegramId: id,
            },
        });
    }
}
