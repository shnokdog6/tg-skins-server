import { Injectable } from "@nestjs/common";
import { Case, Item } from "@prisma/client";
import { GetCaseDto } from "../case/dto/get-case.dto";
import { UpdateCaseDto } from "../case/dto/update-case.dto";
import { FileService } from "../file/file.service";
import { PrismaService } from "../prisma/prisma.service";
import { CreateItemDto } from "./dto/create-item.dto";

@Injectable()
export class ItemService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly fileService: FileService,
    ) {}

    public getMany(dto: GetCaseDto): Promise<Case[]> {
        return this.prismaService.case.findMany({
            ...dto,
        });
    }

    public getOne(id: string): Promise<Case | null> {
        return this.prismaService.case.findUnique({
            where: {
                id,
            },
        });
    }

    public async create(dto: CreateItemDto): Promise<Item> {
        const filename = (await this.fileService.saveImage(dto.image)) || "empty";

        return this.prismaService.item.create({
            data: {
                ...dto,
                image: filename,
                cost: +dto.cost
            },
        });
    }

    public update({ id, ...dto }: UpdateCaseDto): Promise<Case> {
        return this.prismaService.case.update({
            data: dto,
            where: {
                id,
            },
        });
    }

    public delete(id: string): Promise<Case> {
        return this.prismaService.item.delete({
            where: {
                id,
            },
        });
    }
}
