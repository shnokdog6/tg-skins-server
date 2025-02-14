import { Injectable } from "@nestjs/common";
import { InventoryItem } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { AddItemDto } from "./dto/add-item.dto";
import { GetItemsDto } from "./dto/get-items.dto";

@Injectable()
export class InventoryService {
    constructor(private readonly prismaService: PrismaService) {}

    public async getItems(dto: GetItemsDto) {
        return this.prismaService.inventoryItem.findMany({
            skip: dto.skip || 0,
            take: dto.take || 20,
            where: {
                inventoryId: dto.inventoryId,
            },
            include: {
                item: true
            },
            omit: {
                itemId: true
            }
        });
    }

    public async addItem(dto: AddItemDto) {
        const inventoryItem = await this.prismaService.inventoryItem.create({
            data: {
                itemId: dto.itemId,
                inventoryId: dto.inventoryId,
            },
        });
        return inventoryItem;
    }
}
