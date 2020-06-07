import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { GetListDto } from 'src/account/dto/list-account.dto';

@Controller('project')
export class ProjectsController {
    constructor(private projectsService: ProjectsService) { }

    @Get()
    @Roles("ADMIN")
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getList(@Query() getListDto: GetListDto) {
        return await this.projectsService.getListProject(getListDto);
    }
}
