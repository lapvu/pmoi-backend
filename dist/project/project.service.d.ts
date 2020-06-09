import { Model } from 'mongoose';
import { GetListDto, GetDto, DeleteDto } from 'src/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { Document } from 'mongoose';
export declare class ProjectService {
    private projectModel;
    constructor(projectModel: Model<Document>);
    getListProject(getlistDto: GetListDto): Promise<any>;
    createProject(createProjectDto: CreateProjectDto): Promise<any>;
    getProject(getProjectdto: GetDto): Promise<any>;
    deleteProject(deleteDto: DeleteDto): Promise<any>;
    updateProject(getProjectdto: GetDto, updateProjectDto: CreateProjectDto): Promise<any>;
}
