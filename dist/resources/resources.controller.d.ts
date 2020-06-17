import { ResourcesService } from './resources.service';
import { GetDto, GetListDto, DeleteDto } from 'src/common';
import { CreateResourcesDto } from './dto/create-resources.dto';
import { UpdateResourcesDto } from './dto/update-resources.dto';
export declare class ResourcesController {
    private resourcesService;
    constructor(resourcesService: ResourcesService);
    create(createResourcesDto: CreateResourcesDto): Promise<any>;
    getList(getListDto: GetListDto): Promise<any>;
    getAccount(getDto: GetDto): Promise<any>;
    delete(deleteDto: DeleteDto): Promise<any>;
    update(getDto: GetDto, updateResourcesDto: UpdateResourcesDto): Promise<any>;
}
