import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { ProjectService } from 'src/project/project.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { GetListDto, GetDto, DeleteDto } from 'src/common';
import { convertQueryParams } from 'src/utils';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';


@Injectable()
export class PortfolioService {
    constructor(private projectService: ProjectService) { }

    async createPortfolio(createPortfolioDto: CreatePortfolioDto): Promise<any> {
        if (Types.ObjectId.isValid(createPortfolioDto.projectId.toString())) {
            let record: any = await this.projectService.projectModel.findOne({ "childProjects._id": createPortfolioDto.projectId });
            record.childProjects.forEach((e, i) => {
                if (e._id == createPortfolioDto.projectId.toString()) {
                    record.childProjects[i].portfolios.push({
                        ...createPortfolioDto
                    })
                }
            })
            let data = await record.save();
            return {
                data
            }
        } else {
            let record: any = await this.projectService.projectModel.findOne({ _id: parseInt(createPortfolioDto.projectId) });
            record.portfolios.push({
                ...createPortfolioDto
            })
            let data = await record.save();
            return {
                data
            }
        }
    }

    async getListPortfolio(getListDto: GetListDto, user): Promise<any> {
        let query = convertQueryParams(getListDto);
        const q = [
            {
                $match: {
                    $or: [{ investor: Types.ObjectId(user._id) }, { "childProjects.investor": Types.ObjectId(user._id) }]
                }
            }, {
                $unwind: {
                    path: "$portfolios",
                    preserveNullAndEmptyArrays: true
                }
            }, {
                $unwind: {
                    path: "$childProjects",
                    preserveNullAndEmptyArrays: true
                }
            }, {
                $unwind: {
                    path: "$childProjects.portfolios",
                    preserveNullAndEmptyArrays: true
                }
            }, {
                $project: {
                    _id: {
                        $cond: { if: { $eq: ["$childProjects", null] }, then: "$portfolios._id", else: "$childProjects.portfolios._id" }
                    },
                    attachment: {
                        $cond: { if: { $eq: ["$childProjects", null] }, then: "$portfolios.attachment", else: "$childProjects.portfolios.attachment" }
                    },
                    name: {
                        $cond: { if: { $eq: ["$childProjects", null] }, then: "$portfolios.name", else: "$childProjects.portfolios.name" }
                    },
                    builder: {
                        $cond: { if: { $eq: ["$childProjects", null] }, then: "$portfolios.builder", else: "$childProjects.portfolios.builder" }
                    },
                    winBidTime: {
                        $cond: { if: { $eq: ["$childProjects", null] }, then: "$portfolios.winBidTime", else: "$childProjects.portfolios.winBidTime" }
                    },
                    desc: {
                        $cond: { if: { $eq: ["$childProjects", null] }, then: "$portfolios.desc", else: "$childProjects.portfolios.desc" }
                    },
                    projectName: {
                        $cond: { if: { $eq: ["$childProjects", null] }, then: "$name", else: "$childProjects.name" }
                    },
                }
            }, {
                $unwind: {
                    path: "$_id",
                    preserveNullAndEmptyArrays: false
                }
            },
            {
                $match: query._filter
            },
        ]
        const data: any = await this.projectService.projectModel.aggregate([
            ...q,
            {
                $skip: query._offset
            },
            {
                $limit: query._limit
            },
            {
                $sort: query._sort
            },
        ])
        const count: any = await this.projectService.projectModel.aggregate([
            ...q,
            {
                $count: "total"
            }
        ])
        return {
            data,
            total: count[0] ? count[0].total : 0
        }
    }

    async getPortfolio(getDto: GetDto, user: any): Promise<any> {
        const q = [
            {
                $match: {
                    $or: [{ investor: Types.ObjectId(user._id) }, { "childProjects.investor": Types.ObjectId(user._id) }]
                }
            }, {
                $unwind: {
                    path: "$portfolios",
                    preserveNullAndEmptyArrays: true
                }
            }, {
                $unwind: {
                    path: "$childProjects",
                    preserveNullAndEmptyArrays: true
                }
            }, {
                $unwind: {
                    path: "$childProjects.portfolios",
                    preserveNullAndEmptyArrays: true
                }
            }, {
                $project: {
                    _id: {
                        $cond: { if: { $eq: ["$childProjects", null] }, then: "$portfolios._id", else: "$childProjects.portfolios._id" }
                    },
                    attachment: {
                        $cond: { if: { $eq: ["$childProjects", null] }, then: "$portfolios.attachment", else: "$childProjects.portfolios.attachment" }
                    },
                    name: {
                        $cond: { if: { $eq: ["$childProjects", null] }, then: "$portfolios.name", else: "$childProjects.portfolios.name" }
                    },
                    builder: {
                        $cond: { if: { $eq: ["$childProjects", null] }, then: "$portfolios.builder", else: "$childProjects.portfolios.builder" }
                    },
                    winBidTime: {
                        $cond: { if: { $eq: ["$childProjects", null] }, then: "$portfolios.winBidTime", else: "$childProjects.portfolios.winBidTime" }
                    },
                    desc: {
                        $cond: { if: { $eq: ["$childProjects", null] }, then: "$portfolios.desc", else: "$childProjects.portfolios.desc" }
                    },
                    projectName: {
                        $cond: { if: { $eq: ["$childProjects", null] }, then: "$name", else: "$childProjects.name" }
                    },
                    projectId: {
                        $cond: { if: { $eq: ["$childProjects", null] }, then: "$_id", else: "$childProjects._id" }
                    },
                }
            }, {
                $unwind: {
                    path: "$_id",
                    preserveNullAndEmptyArrays: false
                }
            },
            {
                $match: { _id: Types.ObjectId(getDto._id) }
            },
        ]
        let data = await this.projectService.projectModel.aggregate(q);
        return {
            data: data[0]
        }
    }

    async updatePortfolio(updatePortfolioDto: UpdatePortfolioDto, getDto: GetDto): Promise<any> {
        let record: any = await this.projectService.projectModel.findOne(
            {
                $or: [
                    { "portfolios._id": Types.ObjectId(getDto._id) },
                    { "childProjects.portfolios._id": Types.ObjectId(getDto._id) }
                ]
            }
        )
        if (record.hasChildProject) {
            record.childProjects.forEach((e, i) => {
                if (record.childProjects[i]._id == updatePortfolioDto.projectId) {
                    record.childProjects[i].portfolios.forEach((element, index) => {
                        if (record.childProjects[i].portfolios[index]._id == getDto._id) {
                            record.childProjects[i].portfolios[index] = updatePortfolioDto
                        }
                    });
                }
            })
            let data = await this.projectService.projectModel.updateOne({
                $or: [
                    { "portfolios._id": Types.ObjectId(getDto._id) },
                    { "childProjects.portfolios._id": Types.ObjectId(getDto._id) }
                ]
            }, record)
            return {
                data
            }
        } else {
            record.portfolios.forEach((e, i) => {
                if (record.portfolios[i]._id == getDto._id) {
                    record.portfolios[i] = updatePortfolioDto
                }
            });
            let data = await this.projectService.projectModel.updateOne({
                $or: [
                    { "portfolios._id": Types.ObjectId(getDto._id) },
                    { "childProjects.portfolios._id": Types.ObjectId(getDto._id) }
                ]
            }, record)
            return {
                data
            }
        }
    }

    async deletePortfolio(deleteDto: DeleteDto, user: any): Promise<any> {
        let record: any = await this.projectService.projectModel.findOne({
            $or: [
                { "portfolios._id": Types.ObjectId(deleteDto._id) },
                { "childProjects.portfolios._id": Types.ObjectId(deleteDto._id) }
            ]
        })
        if (record.hasChildProject) {
            record.childProjects.forEach((e, i) => {
                if (record.childProjects[i].investor.toString() == user._id.toString()) {
                    record.childProjects[i].portfolios.forEach((element, index) => {
                        if (record.childProjects[i].portfolios[index]._id == deleteDto._id) {
                            record.childProjects[i].portfolios.splice(index, 1)
                        }
                    });
                }
            })
            let data = await this.projectService.projectModel.update({
                $or: [
                    { "portfolios._id": Types.ObjectId(deleteDto._id) },
                    { "childProjects.portfolios._id": Types.ObjectId(deleteDto._id) }
                ]
            }, record)
            return {
                data
            }
        } else {
            let data = await this.projectService.projectModel.update({
                $or: [
                    { "portfolios._id": Types.ObjectId(deleteDto._id) },
                    { "childProjects.portfolios._id": Types.ObjectId(deleteDto._id) }
                ]
            }, {
                $pull: { portfolios: { _id: Types.ObjectId(deleteDto._id) } }
            })
            return {
                data
            }
        }
    }
}
