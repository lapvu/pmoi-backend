import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { CreateResourcesDto } from './dto/create-resources.dto';
import { GetListDto, GetDto, DeleteDto } from 'src/common';
import { convertQueryParams } from 'src/utils';
import { UpdateResourcesDto } from './dto/update-resources.dto';

@Injectable()
export class ResourcesService {
    constructor(@InjectModel('Resources') private resourcesModel: Model<Document>) { }

    async createResources(createResourcesDto: CreateResourcesDto): Promise<any> {
        let res = new this.resourcesModel({
            ...createResourcesDto
        })
        let data = await res.save();
        return {
            data
        }
    }

    async getListResources(getlistDto: GetListDto): Promise<any> {
        const query = convertQueryParams(getlistDto);
        const result = await this.resourcesModel
            .find(query._filter)
            .skip(query._offset)
            .limit(query._limit)
            .sort(query._sort);
        const total = await this.resourcesModel.count(query._filter);
        return {
            data: result,
            total
        };
    }

    async getResources(getDto: GetDto): Promise<any> {
        let data = await this.resourcesModel.findOne(getDto)
        return {
            data
        }
    }

    async updateResources(getDto: GetDto, updateResourcesDto: UpdateResourcesDto): Promise<any> {
        let result = await this.resourcesModel.updateOne(getDto, updateResourcesDto)
        return {
            data: result
        }
    }

    async deleteResources(deleteDto:DeleteDto): Promise<any> {
        let data = await this.resourcesModel.deleteOne(deleteDto)
        return {
            data
        }
    }
}
