import { IsNumber, IsOptional } from "class-validator";

export class GetItemDto {
    @IsOptional()
    @IsNumber()
    skip?: number;

    @IsOptional()
    @IsNumber()
    take?: number;
}
