export class CreateItemDto {
    name: string;
    image: Express.Multer.File;
    cost: number;
    caseId: string;
}