import { Injectable } from "@nestjs/common";
import { Rarity } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { CreateRarityDto } from "./dto/create-rarity.dto";
import { GetRarityDto } from "./dto/get-rarity.dto";

@Injectable()
export class RarityService {
    constructor(private readonly prismaService: PrismaService) {}

    public create(dto: CreateRarityDto): Promise<Rarity> {
        return this.prismaService.rarity.create({ data: dto });
    }

    public getMany(dto: GetRarityDto): Promise<Rarity[]> {
        return this.prismaService.rarity.findMany({
            skip: dto.skip ?? 0,
            take: dto.take ?? 10,
        });
    }

    public getOne(id: string): Promise<Rarity | null> {
        return this.prismaService.rarity.findUnique({
            where: {
                id,
            },
        });
    }
}
