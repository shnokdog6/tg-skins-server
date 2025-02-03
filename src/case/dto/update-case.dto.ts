import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateCaseDto {
    @IsNotEmpty()
    id: string;

    @IsString()
    name?: string;

    @IsNumber()
    cost?: number;

    image?: string;
}
