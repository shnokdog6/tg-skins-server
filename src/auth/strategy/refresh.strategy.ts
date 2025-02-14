import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthGuard, PassportStrategy } from "@nestjs/passport";
import cookie from "cookie";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
    constructor(configService: ConfigService<EnvironmentVariables>) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([RefreshTokenStrategy.jwtFromCookie]),
            ignoreExpiration: false,
            passReqToCallback: true,
            secretOrKey: configService.get("JWT_REFRESH_KEY"),
        });
    }

    private static jwtFromCookie(req: Request): string | null {
        try {
            return cookie.parse(req.headers.cookie!).refreshToken || null;
        } catch {
            throw new BadRequestException();
        }
    }

    public async validate(req: Request, payload: any) {
        const refreshToken = RefreshTokenStrategy.jwtFromCookie(req);
        return { ...payload, refreshToken };
    }
}

export const JwtRefreshGuard = AuthGuard("jwt-refresh");