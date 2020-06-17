import { Model, Document } from 'mongoose';
import { CreateResourcesDto } from './dto/create-resources.dto';
import { GetListDto, GetDto, DeleteDto } from 'src/common';
import { UpdateResourcesDto } from './dto/update-resources.dto';
export declare class ResourcesService {
    private resourcesModel;
    constructor(resourcesModel: Model<Document>);
    createResources(createResourcesDto: CreateResourcesDto): Promise<any>;
    getListResources(getlistDto: GetListDto): Promise<any>;
    getResources(getDto: GetDto): Promise<any>;
    updateResources(getDto: GetDto, updateResourcesDto: UpdateResourcesDto): Promise<any>;
    deleteResources(deleteDto: DeleteDto): Promise<any>;
}
