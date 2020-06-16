import { ProjectService } from 'src/project/project.service';
export declare class InvestmentService {
    private projectService;
    constructor(projectService: ProjectService);
    createInvesment(): Promise<any>;
}
