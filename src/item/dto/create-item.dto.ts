import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateItemDto {
    @IsNotEmpty()
    name: string;

    image: Express.Multer.File;

    @IsNumber()
    cost: number;

    @IsNotEmpty()
    rarityId: string;

    @IsNotEmpty()
    caseId: string;
}
