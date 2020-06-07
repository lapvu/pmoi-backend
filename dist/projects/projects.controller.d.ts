import { ProjectsService } from './projects.service';
import { GetListDto } from 'src/account/dto/list-account.dto';
export declare class ProjectsController {
    private projectsService;
    constructor(projectsService: ProjectsService);
    getList(getListDto: GetListDto): Promise<any>;
}
