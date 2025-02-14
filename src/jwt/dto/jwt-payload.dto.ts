import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class JwtPayloadDto {
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    inventoryId: string;

    @IsOptional()
    @IsNumber()
    iat?: number;

    @IsOptional()
    @IsNumber()
    exp?: number;
}
