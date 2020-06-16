import { Model, Document } from 'mongoose';
import { GetListDto, GetDto, DeleteDto } from 'src/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { NotificationService } from 'src/notification/notification.service';
export declare class ProjectService {
    projectModel: Model<Document>;
    private notificationService;
    constructor(projectModel: Model<Document>, notificationService: NotificationService);
    getListProject(getlistDto: GetListDto, user: any): Promise<any>;
    createProject(createProjectDto: CreateProjectDto, _id: string): Promise<any>;
    getProject(getProjectdto: GetDto): Promise<any>;
    deleteProject(deleteDto: DeleteDto): Promise<any>;
    updateProject(getProjectdto: GetDto, updateProjectDto: CreateProjectDto): Promise<any>;
}
