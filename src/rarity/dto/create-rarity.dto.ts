import { IsHexColor, IsNotEmpty } from "class-validator";

export class CreateRarityDto {
    @IsNotEmpty()
    name: string;

    @IsHexColor()
    color: string;
}