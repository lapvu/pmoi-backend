import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetListDto } from 'src/account/dto/list-account.dto';

@Injectable()
export class ProjectsService {
    constructor(@InjectModel('Project') private projectModel: Model<any>) { }

    async getListProject(getlistDto: GetListDto): Promise<any> {
        const sortOrder = getlistDto.sort[0].split(",");
        const result = await this.projectModel
            .find({})
            .skip(parseInt(getlistDto.offset))
            .limit(parseInt(getlistDto.limit))
            .sort([[sortOrder[0], sortOrder[1] === "ASC" ? -1 : 1]]);
        const total = await this.projectModel.count({});
        return {
            data: result,
            total
        };
    }

    async createProject():Promise<any>{
        
    }
}
