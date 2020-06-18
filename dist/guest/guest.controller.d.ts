import { ProjectService } from 'src/project/project.service';
import { GetListDto, GetDto } from 'src/common';
import { AccountService } from 'src/account/account.service';
export declare class GuestController {
    private projectService;
    private accountSerive;
    constructor(projectService: ProjectService, accountSerive: AccountService);
    getListProject(getListDto: GetListDto): Promise<any>;
    getListInvestor(getListDto: GetListDto): Promise<any>;
    getProject(getDto: GetDto): Promise<any>;
    getInvestor(getDto: GetDto): Promise<any>;
}
