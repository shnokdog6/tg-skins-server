import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthLoginDto } from "./dto/auth-login.dto";
import { Request, Response } from "express";
import { JwtRefreshGuard } from "./strategy/refresh.strategy";

const fifteenDaysInMilliseconds = 15 * 24 * 60 * 60 * 1000;

@Controller({ path: "auth" })
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post("/login")
    async login(@Body() dto: AuthLoginDto, @Res({ passthrough: true }) res: Response) {
        const tokens = await this.authService.login(dto);
        this.setRefreshToken(res, tokens.refreshToken);
        return tokens;
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtRefreshGuard)
    @Get("update")
    public async refreshTokens(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ) {
        // const data = await this.authService.refreshTokens(
        //     req.user["id"],
        //     req.user["refreshToken"],
        // );
        // this.setRefreshToken(res, data.refreshToken);
        // return data;
    }

    private setRefreshToken(res: Response, refreshToken: string) {
        res.cookie("refreshToken", refreshToken, {
            maxAge: fifteenDaysInMilliseconds,
            httpOnly: true,
            sameSite: "none",
            secure: true,
        });
    }

}
