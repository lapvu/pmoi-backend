import { Controller, Get, Query } from '@nestjs/common';
import { ProjectService } from 'src/project/project.service';
import { GetListDto } from 'src/common';
import { AccountService } from 'src/account/account.service';

@Controller('guest')
export class GuestController {
    constructor(private projectService: ProjectService, private accountSerive: AccountService) { }

    @Get("project")
    async getProject(@Query() getListDto: GetListDto) {
        return this.projectService.getListProject(getListDto, { accountType: null })
    }

    @Get("investor")
    async getInvestor(@Query() getListDto: GetListDto) {
        return this.accountSerive.getListInvestor(getListDto)
    }
}
