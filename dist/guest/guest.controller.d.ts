import { ProjectService } from 'src/project/project.service';
import { GetListDto } from 'src/common';
import { AccountService } from 'src/account/account.service';
export declare class GuestController {
    private projectService;
    private accountSerive;
    constructor(projectService: ProjectService, accountSerive: AccountService);
    getProject(getListDto: GetListDto): Promise<any>;
    getInvestor(getListDto: GetListDto): Promise<any>;
}
