import { Model } from 'mongoose';
import { GetListDto } from 'src/account/dto/list-account.dto';
export declare class ProjectsService {
    private projectModel;
    constructor(projectModel: Model<any>);
    getListProject(getlistDto: GetListDto): Promise<any>;
    createProject(): Promise<any>;
}
