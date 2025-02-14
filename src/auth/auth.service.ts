import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "../jwt/jwt.service";
import { PrismaService } from "../prisma/prisma.service";
import { AuthLoginDto } from "./dto/auth-login.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService,
    ) {}

    async login(dto: AuthLoginDto) {
        const user =
            (await this.prismaService.user.findUnique({
                where: {
                    telegramId: dto.telegramId,
                },
                include: {
                    inventory: {
                        omit: {
                            userId: true,
                        },
                    },
                },
            })) ||
            (await this.prismaService.user.create({
                data: {
                    telegramId: dto.telegramId,
                    username: dto.username,
                    inventory: {
                        create: {},
                    },
                },
                include: {
                    inventory: {
                        omit: {
                            userId: true,
                        },
                    },
                },
            }));

        return this.jwtService.generateTokens({
            id: user.id,
            inventoryId: user.inventory!.id,
        });
    }

    // public async refreshTokens(userId: string, refreshToken: string) {
    //     const user = await this.prismaService.user.findUnique({
    //         where: {
    //             id: userId,
    //         },
    //     });
    //
    //     if (!user || !user.refreshToken) {
    //         throw new BadRequestException();
    //     }
    //
    //     const refreshTokensMatches = await bcrypt.compare(refreshToken, user.refreshToken);
    //
    //     if (!refreshTokensMatches) {
    //         throw new BadRequestException();
    //     }
    //
    //     return {
    //         ...(await this.generateTokens(user, [RoleType.USER])),
    //         roles: [RoleType.USER],
    //     } as AuthResponseDto;
    // }
}
