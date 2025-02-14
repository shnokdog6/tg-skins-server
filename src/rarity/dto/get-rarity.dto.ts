import { IsNumber, IsOptional } from "class-validator";

export class GetRarityDto {
    @IsOptional()
    @IsNumber()
    skip?: number;

    @IsOptional()
    @IsNumber()
    take?: number;
}
