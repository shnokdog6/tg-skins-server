import { Injectable } from "@nestjs/common";
import { Case, Item } from "@prisma/client";
import { FileService } from "../file/file.service";
import { PrismaService } from "../prisma/prisma.service";
import { CreateCaseDto } from "./dto/create-case.dto";
import { GetCaseDto } from "./dto/get-case.dto";
import { UpdateCaseDto } from "./dto/update-case.dto";

@Injectable()
export class CaseService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly fileService: FileService,
    ) {}

    public getMany(dto: GetCaseDto): Promise<Case[]> {
        return this.prismaService.case.findMany({
            skip: dto.skip ?? 0,
            take: dto.take ?? 10,
        });
    }

    public getOne(id: string): Promise<Case | null> {
        return this.prismaService.case.findUnique({
            where: {
                id,
            },
        });
    }

    public async getItems(id: string): Promise<Item[]> {
        const result = await this.prismaService.case.findUnique({
            where: {
                id,
            },
            include: {
                items: true,
            },
            omit: {
                id: true,
                name: true,
                cost: true,
                image: true,
            },
        });
        return result?.items || [];
    }

    public async create(dto: CreateCaseDto): Promise<Case> {
        const filename = (await this.fileService.saveImage(dto.image)) || "empty";

        return this.prismaService.case.create({
            data: {
                ...dto,
                image: filename,
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
        return this.prismaService.case.delete({
            where: {
                id,
            },
        });
    }
}
