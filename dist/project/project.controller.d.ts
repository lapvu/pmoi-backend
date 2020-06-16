import { ProjectService } from './project.service';
import { GetListDto, GetDto, DeleteDto } from 'src/common';
import { CreateProjectDto } from './dto/create-project.dto';
export declare class ProjectController {
    private projectsService;
    constructor(projectsService: ProjectService);
    getList(getListDto: GetListDto, req: any): Promise<any>;
    createProject(createProjectDto: CreateProjectDto, req: any): Promise<any>;
    getProject(getProjectDto: GetDto): Promise<any>;
    delete(deleteProjectDto: DeleteDto): Promise<any>;
    update(getProjectDto: GetDto, updateProjectDto: CreateProjectDto): Promise<any>;
}
