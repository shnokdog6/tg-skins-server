import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import jwt from "jsonwebtoken";
import { JwtPayloadDto } from "./dto/jwt-payload.dto";
import { JwtTokensDto } from "./dto/jwt-tokens.dto";

@Injectable()
export class JwtService {
    constructor(private readonly configService: ConfigService<EnvironmentVariables>) {}

    public generateTokens(dto: Omit<JwtPayloadDto, "iat" | "exp">): JwtTokensDto {
        return {
            accessToken: jwt.sign(dto, this.configService.get("JWT_ACCESS_KEY")!, {
                expiresIn: "15m",
            }),
            refreshToken: jwt.sign(dto, this.configService.get("JWT_REFRESH_KEY")!, {
                expiresIn: "15d",
            }),
        } as JwtTokensDto;
    }
}
