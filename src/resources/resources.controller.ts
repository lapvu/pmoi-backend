import { Controller, Get, UseGuards, Delete, Query, Param, Body, Post, Put } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { GetDto, GetListDto, DeleteDto } from 'src/common';
import { CreateResourcesDto } from './dto/create-resources.dto';
import { UpdateResourcesDto } from './dto/update-resources.dto';

@Controller('resources')
export class ResourcesController {
    constructor(private resourcesService: ResourcesService) { }

    @Post()
    @Roles("MINISTRY")
    @UseGuards(JwtAuthGuard, RolesGuard)
    async create(@Body() createResourcesDto: CreateResourcesDto) {
        return await this.resourcesService.createResources(createResourcesDto);
    }

    @Get()
    @Roles("MINISTRY")
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getList(@Query() getListDto: GetListDto) {
        return await this.resourcesService.getListResources(getListDto);
    }

    @Get(":_id")
    @Roles("MINISTRY")
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getAccount(@Param() getDto: GetDto) {
        return await this.resourcesService.getResources(getDto);
    }

    @Delete(':_id')
    @Roles("MINISTRY")
    @UseGuards(JwtAuthGuard, RolesGuard)
    async delete(@Param() deleteDto: DeleteDto) {
        return await this.resourcesService.deleteResources(deleteDto);
    }


    @Put(':_id')
    @Roles("MINISTRY")
    @UseGuards(JwtAuthGuard, RolesGuard)
    async update(@Param() getDto: GetDto, @Body() updateResourcesDto: UpdateResourcesDto) {
        return await this.resourcesService.updateResources(getDto, updateResourcesDto);
    }
}
