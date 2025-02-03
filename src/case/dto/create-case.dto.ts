import { Transform } from "class-transformer";
import { IsNumber, IsNumberString, IsString } from "class-validator";

export class CreateCaseDto {
    @IsString()
    name: string;

    @IsNumber()
    cost: number;

    image: Express.Multer.File;
}
