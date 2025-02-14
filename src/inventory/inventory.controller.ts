import { Controller, Get, Query, Req, UseGuards } from "@nestjs/common";
import { InventoryItem } from "@prisma/client";
import { JwtAccessGuard } from "../auth/strategy/access.strategy";
import { InventoryService } from "./inventory.service";
import { GetItemsDto } from "./dto/get-items.dto";
import { Request } from "express";

@Controller({ path: "inventory" })
export class InventoryController {
    constructor(private readonly inventoryService: InventoryService) {
    }

    @UseGuards(JwtAccessGuard)
    @Get("/items")
    public async getItems(@Req() req: Request, @Query() dto: GetItemsDto) {
        return this.inventoryService.getItems({
            ...dto,
            inventoryId: req.user!["inventoryId"],
        });
    }
}
