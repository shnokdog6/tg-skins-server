import { IsNumber, IsOptional } from "class-validator";

export class GetItemsDto {
    inventoryId: string;

    @IsOptional()
    @IsNumber()
    skip?: number;

    @IsOptional()
    @IsNumber()
    take?: number;
}