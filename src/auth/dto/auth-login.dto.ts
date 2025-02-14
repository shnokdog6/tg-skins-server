import { IsNotEmpty, IsNumber } from "class-validator";

export class AuthLoginDto {

    @IsNumber()
    telegramId: number;

    @IsNotEmpty()
    username: string;
}