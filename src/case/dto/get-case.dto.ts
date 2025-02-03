import { IsNumber, IsOptional } from "class-validator";

export class GetCaseDto {
    @IsOptional()
    @IsNumber()
    skip?: number;

    @IsOptional()
    @IsNumber()
    take?: number;
}
