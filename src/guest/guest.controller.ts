import { Controller, Get, Query } from '@nestjs/common';
import { ProjectService } from 'src/project/project.service';
import { GetListDto, GetDto } from 'src/common';
import { AccountService } from 'src/account/account.service';

@Controller('guest')
export class GuestController {
    constructor(private projectService: ProjectService, private accountSerive: AccountService) { }

    @Get("project")
    async getListProject(@Query() getListDto: GetListDto) {
        return this.projectService.getListProject(getListDto, { accountType: null })
    }

    @Get("investor")
    async getListInvestor(@Query() getListDto: GetListDto) {
        return this.accountSerive.getListInvestor(getListDto)
    }

    @Get("project/:_id")
    async getProject(@Query() getDto: GetDto) {
        return this.projectService.getProject(getDto)
    }

    @Get("investor/:_id")
    async getInvestor(@Query() getDto: GetDto) {
        return this.accountSerive.getInvestor(getDto)
    }

}
