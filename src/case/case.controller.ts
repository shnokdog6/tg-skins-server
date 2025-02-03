import {
    Body,
    Controller, FileTypeValidator,
    Get,
    Param,
    ParseFilePipe,
    Post,
    Query,
    UploadedFile,
    UseInterceptors,
} from "@nestjs/common";
import { Case, Item } from "@prisma/client";
import { CaseService } from "./case.service";
import { CreateCaseDto } from "./dto/create-case.dto";
import { GetCaseDto } from "./dto/get-case.dto";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";

@Controller("case")
export class CaseController {
    constructor(private readonly caseService: CaseService) {
    }

    @Get()
    getMany(@Query() dto: GetCaseDto): Promise<Case[]> {
        return this.caseService.getMany(dto);
    }

    @Get(":id")
    getOne(@Param("id") id: string): Promise<Case | null> {
        return this.caseService.getOne(id);
    }

    @Get(":id/items")
    getItems(@Param("id") id: string): Promise<Item[]> {
        return this.caseService.getItems(id);
    }

    @Post()
    @UseInterceptors(FileInterceptor("image"))
    create(@Body() dto: CreateCaseDto, @UploadedFile(
        new ParseFilePipe({
            validators: [new FileTypeValidator({ fileType: "image/*" })],
        }),
    ) image: Express.Multer.File): Promise<Case> {
        return this.caseService.create({ ...dto, image });
    }
}
