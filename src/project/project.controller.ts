import { Controller, Get, UseGuards, Query, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { GetListDto, GetDto, DeleteDto } from 'src/common';
import { CreateProjectDto } from './dto/create-project.dto';

@Controller('project')
export class ProjectController {
    constructor(private projectsService: ProjectService) { }

    @Get()
    @Roles("ADMIN", "MINISTRY")
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getList(@Query() getListDto: GetListDto) {
        return await this.projectsService.getListProject(getListDto);
    }

    @Post()
    @Roles("ADMIN", "MINISTRY")
    @UseGuards(JwtAuthGuard, RolesGuard)
    async createProject(@Body() createProjectDto: CreateProjectDto) {
        return await this.projectsService.createProject(createProjectDto);
    }

    @Get(":_id")
    @Roles("ADMIN", "MINISTRY")
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getProject(@Param() getProjectDto: GetDto) {
        return await this.projectsService.getProject(getProjectDto);
    }

    @Delete(":_id")
    @Roles("ADMIN", "MINISTRY")
    @UseGuards(JwtAuthGuard, RolesGuard)
    async delete(@Param() deleteProjectDto: DeleteDto) {
        return await this.projectsService.deleteProject(deleteProjectDto);
    }

    @Put(":_id")
    @Roles("ADMIN", "MINISTRY")
    @UseGuards(JwtAuthGuard, RolesGuard)
    async update(@Param() getProjectDto: GetDto, @Body() updateProjectDto: CreateProjectDto) {
        return await this.projectsService.updateProject(getProjectDto, updateProjectDto);
    }
}
