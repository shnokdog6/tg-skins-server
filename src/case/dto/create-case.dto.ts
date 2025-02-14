import { IsNumber, IsString } from "class-validator";

export class CreateCaseDto {
    @IsString()
    name: string;

    @IsNumber()
    cost: number;

    image: Express.Multer.File;
}
