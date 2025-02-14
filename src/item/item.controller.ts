import {
    Body,
    Controller,
    FileTypeValidator,
    ParseFilePipe,
    Post,
    UploadedFile,
    UseInterceptors,
} from "@nestjs/common";
import { Item } from "@prisma/client";
import { CreateItemDto } from "./dto/create-item.dto";
import { ItemService } from "./item.service";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller({ path: "item" })
export class ItemController {
    constructor(private readonly itemService: ItemService) {
    }

    @UseInterceptors(FileInterceptor("image"))
    @Post()
    public async create(@Body() dto: CreateItemDto, @UploadedFile(
        new ParseFilePipe({
            validators: [new FileTypeValidator({ fileType: "image/*" })],
        }),
    ) image: Express.Multer.File): Promise<Item> {
        return this.itemService.create({ ...dto, image });
    }
}
