import {
    Body,
    Controller,
    FileTypeValidator,
    Get,
    Param,
    ParseFilePipe,
    Post,
    Query,
    Req,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { Case } from "@prisma/client";
import { CaseService } from "./case.service";
import { CreateCaseDto } from "./dto/create-case.dto";
import { GetCaseDto } from "./dto/get-case.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAccessGuard } from "../auth/strategy/access.strategy";
import { Request } from "express";

@Controller({ path: "case" })
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
    getItems(@Param("id") id: string) {
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

    @UseGuards(JwtAccessGuard)
    @Get(":id/open")
    open(@Req() req: Request, @Param("id") id: string) {
        return this.caseService.open({
            inventoryId: req.user!["inventoryId"],
            caseId: id
        });
    }
}
