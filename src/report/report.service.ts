import { Injectable } from '@nestjs/common';
import { ProjectService } from 'src/project/project.service';
import { Types } from 'mongoose';
import { DeleteDto, GetDto, GetListDto } from 'src/common';
import { convertQueryParams } from 'src/utils';
import { CreateReportDto } from './dto/create-report.dto';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class ReportService {
    constructor(private projectService: ProjectService, private notificationService: NotificationService) { }

    async createReport(createReportDto: CreateReportDto, user: any): Promise<any> {
        if (Types.ObjectId.isValid(createReportDto.projectId.toString())) {
            let record: any = await this.projectService.projectModel.findOne({ "childProjects._id": createReportDto.projectId });
            record.childProjects.forEach((e, i) => {
                if (e._id == createReportDto.projectId.toString()) {
                    record.childProjects[i].reports.push({
                        ...createReportDto
                    })
                }
            })
            let data = await record.save();
            this.notificationService.pushNotification({
                title: `Có 1 báo cáo mới`,
                body: `${user.username} đã gửi 1 báo cáo cho dự án ${data.name}`,
                sender: user._id,
                recipients: "all"
            })
            return {
                data
            }
        } else {
            let record: any = await this.projectService.projectModel.findOne({ _id: parseInt(createReportDto.projectId) });
            record.reports.push({
                ...createReportDto
            })
            let data = await record.save();
            this.notificationService.pushNotification({
                title: `${user.username} đã gửi 1 báo cáo`,
                body: `${createReportDto.body}`,
                sender: user._id,
                recipients: "all"
            })
            return {
                data
            }
        }
    }

    async getListReport(getListDto: GetListDto, user: any): Promise<any> {
        const query = convertQueryParams(getListDto);
        let q = [{
            $unwind: {
                path: '$reports',
                preserveNullAndEmptyArrays: true
            }
        }, {
            $unwind: {
                path: "$childProjects",
                preserveNullAndEmptyArrays: true
            }
        }, {
            $unwind: {
                path: "$childProjects.reports",
                preserveNullAndEmptyArrays: true
            }
        }, {
            $project: {
                _id: {
                    $cond: { if: { $eq: ["$childProjects", null] }, then: "$reports._id", else: "$childProjects.reports._id" }
                },
                attachment: {
                    $cond: { if: { $eq: ["$childProjects", null] }, then: "$reports.attachment", else: "$childProjects.reports.attachment" }
                },
                title: {
                    $cond: { if: { $eq: ["$childProjects", null] }, then: "$reports.title", else: "$childProjects.reports.title" }
                },
                body: {
                    $cond: { if: { $eq: ["$childProjects", null] }, then: "$reports.body", else: "$childProjects.reports.body" }
                },
                investor: {
                    $cond: { if: { $eq: ["$childProjects", null] }, then: "$investor", else: "$childProjects.investor" }
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
        }, {
            $lookup: {
                from: 'accounts',
                localField: 'investor',
                foreignField: '_id',
                as: 'investor_info'
            }
        }, {
            $unwind: {
                path: '$investor_info',
                preserveNullAndEmptyArrays: false
            }
        }, {
            $project: {
                _id: 1,
                title: 1,
                body: 1,
                attachment: 1,
                projectName: 1,
                investorName: '$investor_info.investorName'
            }
        }]
        if (user.accountType === "INVESTOR") {
            let data = await this.projectService.projectModel.aggregate([
                {
                    $match: { $or: [{ investor: user._id }, { "childProjects.investor": user._id }] }
                },
                ...q,
                {
                    $skip: query._offset
                },
                {
                    $limit: query._limit
                },
                {
                    $sort: query._sort
                }
            ])
            let count = await this.projectService.projectModel.aggregate([
                {
                    $match: { $or: [{ investor: user._id }, { "childProjects.investor": user._id }] }
                },
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
        else {
            let data = await this.projectService.projectModel.aggregate([
                ...q,
                {
                    $skip: query._offset
                },
                {
                    $limit: query._limit
                },
                {
                    $sort: query._sort
                }
            ])
            let count = await this.projectService.projectModel.aggregate([
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
    }

    async getReport(getDto: GetDto): Promise<any> {
        let data = await this.projectService.projectModel.aggregate([
            {
                $match: {
                    $or: [
                        { "reports._id": Types.ObjectId(getDto._id) },
                        { "childProjects.reports._id": Types.ObjectId(getDto._id) }
                    ]
                },
            },
            {
                $unwind: {
                    path: '$reports',
                    preserveNullAndEmptyArrays: true
                }
            }, {
                $unwind: {
                    path: "$childProjects",
                    preserveNullAndEmptyArrays: true
                }
            }, {
                $unwind: {
                    path: "$childProjects.reports",
                    preserveNullAndEmptyArrays: true
                }
            }, {
                $project: {
                    _id: {
                        $cond: { if: { $eq: ["$childProjects", null] }, then: "$reports._id", else: "$childProjects.reports._id" }
                    },
                    attachment: {
                        $cond: { if: { $eq: ["$childProjects", null] }, then: "$reports.attachment", else: "$childProjects.reports.attachment" }
                    },
                    title: {
                        $cond: { if: { $eq: ["$childProjects", null] }, then: "$reports.title", else: "$childProjects.reports.title" }
                    },
                    body: {
                        $cond: { if: { $eq: ["$childProjects", null] }, then: "$reports.body", else: "$childProjects.reports.body" }
                    },
                    investor: {
                        $cond: { if: { $eq: ["$childProjects", null] }, then: "$investor", else: "$childProjects.investor" }
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
            }, {
                $lookup: {
                    from: 'accounts',
                    localField: 'investor',
                    foreignField: '_id',
                    as: 'investor_info'
                }
            }, {
                $unwind: {
                    path: '$investor_info',
                    preserveNullAndEmptyArrays: false
                }
            }, {
                $project: {
                    _id: 1,
                    title: 1,
                    body: 1,
                    attachment: 1,
                    projectName: 1,
                    investorName: '$investor_info.investorName'
                }
            }
        ])
        return {
            data: data[0]
        }
    }

    async deleteReport(deleteDto: DeleteDto, user: any): Promise<any> {
        let record: any = await this.projectService.projectModel.findOne({
            $or: [
                { "reports._id": Types.ObjectId(deleteDto._id) },
                { "childProjects.reports._id": Types.ObjectId(deleteDto._id) }
            ]
        })
        if (record.hasChildProject) {
            record.childProjects.forEach((e, i) => {
                if (record.childProjects[i].investor.toString() == user._id.toString()) {
                    record.childProjects[i].reports.forEach((element, index) => {
                        if (record.childProjects[i].reports[index]._id == deleteDto._id) {
                            record.childProjects[i].reports.splice(index, 1)
                        }
                    });
                }
            })
            let data = await this.projectService.projectModel.update({
                $or: [
                    { "reports._id": Types.ObjectId(deleteDto._id) },
                    { "childProjects.reports._id": Types.ObjectId(deleteDto._id) }
                ]
            }, record)
            return {
                data
            }
        } else {
            let data = await this.projectService.projectModel.update({
                $or: [
                    { "reports._id": Types.ObjectId(deleteDto._id) },
                    { "childProjects.reports._id": Types.ObjectId(deleteDto._id) }
                ]
            }, {
                $pull: { reports: { _id: Types.ObjectId(deleteDto._id) } }
            })
            return {
                data
            }
        }
    }
}
