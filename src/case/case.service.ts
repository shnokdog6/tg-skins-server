import { Injectable } from "@nestjs/common";
import { Case } from "@prisma/client";
import { FileService } from "../file/file.service";
import { randomNumber } from "../helpers/random";
import { InventoryService } from "../inventory/inventory.service";
import { PrismaService } from "../prisma/prisma.service";
import { CreateCaseDto } from "./dto/create-case.dto";
import { GetCaseDto } from "./dto/get-case.dto";
import { OpenCaseDto } from "./dto/open-case.dto";
import { UpdateCaseDto } from "./dto/update-case.dto";

@Injectable()
export class CaseService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly fileService: FileService,
        private readonly inventoryService: InventoryService,
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

    public async getItems(id: string) {
        const result = await this.prismaService.case.findUnique({
            where: {
                id,
            },
            include: {
                items: {
                    include: {
                        rarity: true,
                    },
                    omit: {
                        rarityId: true,
                    },
                },
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

    public async open(dto: OpenCaseDto) {
        const caseItems = await this.getItems(dto.caseId);
        const randomIndex = randomNumber(0, caseItems.length - 1);

        await this.inventoryService.addItem({
            inventoryId: dto.inventoryId,
            itemId: caseItems[randomIndex].id,
        });

        return caseItems[randomIndex];
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
