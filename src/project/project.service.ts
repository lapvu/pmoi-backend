import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { GetListDto, GetDto, DeleteDto } from 'src/common';
import { convertQueryParams } from 'src/utils';
import { CreateProjectDto } from './dto/create-project.dto';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class ProjectService {
    constructor(@InjectModel('Project') public projectModel: Model<Document>, private notificationService: NotificationService) { }

    async getListProject(getlistDto: GetListDto, user: any): Promise<any> {
        const query = convertQueryParams(getlistDto);
        if (user.accountType === "INVESTOR") {
            query._filter["$or"] = [{ investor: user._id }, { "childProjects.investor": user._id }];
            const data = await this.projectModel.aggregate([
                {
                    $unwind: {
                        path: "$childProjects",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $match: query._filter
                },
                {
                    $skip: query._offset
                },
                {
                    $limit: query._limit
                },
                {
                    $sort: query._sort
                },
                {
                    $project: {
                        name: {
                            $cond: {
                                if:
                                    { $eq: ["$childProjects", null] }
                                ,
                                then: "$name",
                                else: "$childProjects.name"
                            }
                        },
                        _id: {
                            $cond: {
                                if: { $eq: ["$childProjects", null] },
                                then: "$_id",
                                else: "$childProjects._id"
                            }
                        },
                        desc:
                        {
                            $cond: {
                                if: { $eq: ["$childProjects", null] },
                                then: "$desc",
                                else: "$childProjects.desc"
                            }
                        },
                        approvedInvestment: 1,
                        approvedInvestmentTime: 1,
                        initInvestment: 1,
                        initInvestmentTime: 1,
                        treasuryAddress: 1,
                        totalInvestment: 1,
                        constructionTime: 1,
                        completionTime: 1,
                        managementForm: 1,
                        typeSource: 1,
                        created_at: 1,
                        place: 1,
                        parentId: "$_id",
                        parentProjectName: "$name",
                    }
                }
            ])
            return {
                data,
                total: data.length
            };
        }
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

    async createProject(createProjectDto: CreateProjectDto, _id: string): Promise<any> {
        const project = new this.projectModel(createProjectDto);
        const result: any = await project.save();
        return result;
    }

    async getProject(getProjectdto: GetDto): Promise<any> {
        const result = await this.projectModel.findOne(getProjectdto)
            .populate("childProjects.investor", "investorName")
            .populate("investor", "investorName");
        return {
            data: result
        }
    }

    async deleteProject(deleteDto: DeleteDto): Promise<any> {
        return await this.projectModel.deleteOne(deleteDto)
    }

    async updateProject(getProjectdto: GetDto, updateProjectDto: CreateProjectDto): Promise<any> {
        let data = await this.projectModel.updateOne(getProjectdto, updateProjectDto)
        return {
            data
        }
    }

}