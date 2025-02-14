import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { CreateRarityDto } from "./dto/create-rarity.dto";
import { RarityService } from "./rarity.service";
import { Rarity } from "@prisma/client";
import { GetCaseDto } from "../case/dto/get-case.dto";

@Controller({ path: "rarity" })
export class RarityController {

    constructor(private readonly rarityService: RarityService) {
    }

    @Get()
    public getMany(@Query() dto: GetCaseDto): Promise<Rarity[]> {
        return this.rarityService.getMany(dto);
    }

    @Get(":id")
    public getOne(@Param("id") id: string): Promise<Rarity | null> {
        return this.rarityService.getOne(id);
    }

    @Post()
    public create(@Body() dto: CreateRarityDto): Promise<Rarity> {
        return this.rarityService.create(dto);
    }

}
