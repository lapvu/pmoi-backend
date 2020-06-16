import { Injectable } from '@nestjs/common';
import { ProjectService } from 'src/project/project.service';

@Injectable()
export class InvestmentService {
    constructor(private projectService:ProjectService) { }

    async createInvesment():Promise<any>{
         this.projectService.projectModel
    }
}
