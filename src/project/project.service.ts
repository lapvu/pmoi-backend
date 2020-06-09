import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetListDto, GetDto, DeleteDto } from 'src/common';
import { convertQueryParams } from 'src/utils';
import { CreateProjectDto } from './dto/create-project.dto';
import { Document } from 'mongoose';

@Injectable()
export class ProjectService {
    constructor(@InjectModel('Project') private projectModel: Model<Document>) { }

    async getListProject(getlistDto: GetListDto): Promise<any> {
        const query = convertQueryParams(getlistDto);
        const result = await this.projectModel
            .find(query._filter)
            .populate("childProjects.investor", "investorName")
            .populate("investor", "investorName")
            .skip(query._offset)
            .limit(query._limit)
            .sort(query._sort);
        const total = await this.projectModel.count(query._filter);
        return {
            data: result,
            total
        };
    }

    async createProject(createProjectDto: CreateProjectDto): Promise<any> {
        const project = new this.projectModel(createProjectDto);
        return await project.save();
    }

    async getProject(getProjectdto: GetDto): Promise<any> {
        const result = await this.projectModel.findOne(getProjectdto)
            .populate("childProjects.investor", "investorName")
            .populate("investor","investorName");
        return {
            data: result
        }
    }

    async deleteProject(deleteDto: DeleteDto): Promise<any> {
        return await this.projectModel.deleteOne(deleteDto)
    }

    async updateProject(getProjectdto: GetDto, updateProjectDto: CreateProjectDto): Promise<any> {
        return await this.projectModel.updateOne(getProjectdto, updateProjectDto)
    }
}
