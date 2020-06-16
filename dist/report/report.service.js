"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportService = void 0;
const common_1 = require("@nestjs/common");
const project_service_1 = require("../project/project.service");
const mongoose_1 = require("mongoose");
const common_2 = require("../common");
const utils_1 = require("../utils");
const notification_service_1 = require("../notification/notification.service");
let ReportService = (() => {
    let ReportService = class ReportService {
        constructor(projectService, notificationService) {
            this.projectService = projectService;
            this.notificationService = notificationService;
        }
        async createReport(createReportDto, user) {
            if (mongoose_1.Types.ObjectId.isValid(createReportDto.projectId.toString())) {
                let record = await this.projectService.projectModel.findOne({ "childProjects._id": createReportDto.projectId });
                record.childProjects.forEach((e, i) => {
                    if (e._id == createReportDto.projectId.toString()) {
                        record.childProjects[i].reports.push(Object.assign({}, createReportDto));
                    }
                });
                let data = await record.save();
                this.notificationService.pushNotification({
                    title: `Có 1 báo cáo mới`,
                    body: `${user.username} đã gửi 1 báo cáo cho dự án ${data.name}`,
                    sender: user._id,
                    recipients: "all"
                });
                return {
                    data
                };
            }
            else {
                let record = await this.projectService.projectModel.findOne({ _id: parseInt(createReportDto.projectId) });
                record.reports.push(Object.assign({}, createReportDto));
                let data = await record.save();
                this.notificationService.pushNotification({
                    title: `${user.username} đã gửi 1 báo cáo`,
                    body: `${createReportDto.body}`,
                    sender: user._id,
                    recipients: "all"
                });
                return {
                    data
                };
            }
        }
        async getListReport(getListDto, user) {
            const query = utils_1.convertQueryParams(getListDto);
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
                }];
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
                ]);
                let count = await this.projectService.projectModel.aggregate([
                    {
                        $match: { $or: [{ investor: user._id }, { "childProjects.investor": user._id }] }
                    },
                    ...q,
                    {
                        $count: "total"
                    }
                ]);
                return {
                    data,
                    total: count[0] ? count[0].total : 0
                };
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
                ]);
                let count = await this.projectService.projectModel.aggregate([
                    ...q,
                    {
                        $count: "total"
                    }
                ]);
                return {
                    data,
                    total: count[0] ? count[0].total : 0
                };
            }
        }
        async getReport(getDto) {
            let data = await this.projectService.projectModel.aggregate([
                {
                    $match: {
                        $or: [
                            { "reports._id": mongoose_1.Types.ObjectId(getDto._id) },
                            { "childProjects.reports._id": mongoose_1.Types.ObjectId(getDto._id) }
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
            ]);
            return {
                data: data[0]
            };
        }
        async deleteReport(deleteDto, user) {
            let record = await this.projectService.projectModel.findOne({
                $or: [
                    { "reports._id": mongoose_1.Types.ObjectId(deleteDto._id) },
                    { "childProjects.reports._id": mongoose_1.Types.ObjectId(deleteDto._id) }
                ]
            });
            if (record.hasChildProject) {
                record.childProjects.forEach((e, i) => {
                    if (record.childProjects[i].investor.toString() == user._id.toString()) {
                        record.childProjects[i].reports.forEach((element, index) => {
                            if (record.childProjects[i].reports[index]._id == deleteDto._id) {
                                record.childProjects[i].reports.splice(index, 1);
                            }
                        });
                    }
                });
                let data = await this.projectService.projectModel.update({
                    $or: [
                        { "reports._id": mongoose_1.Types.ObjectId(deleteDto._id) },
                        { "childProjects.reports._id": mongoose_1.Types.ObjectId(deleteDto._id) }
                    ]
                }, record);
                return {
                    data
                };
            }
            else {
                let data = await this.projectService.projectModel.update({
                    $or: [
                        { "reports._id": mongoose_1.Types.ObjectId(deleteDto._id) },
                        { "childProjects.reports._id": mongoose_1.Types.ObjectId(deleteDto._id) }
                    ]
                }, {
                    $pull: { reports: { _id: mongoose_1.Types.ObjectId(deleteDto._id) } }
                });
                return {
                    data
                };
            }
        }
    };
    ReportService = __decorate([
        common_1.Injectable(),
        __metadata("design:paramtypes", [project_service_1.ProjectService, notification_service_1.NotificationService])
    ], ReportService);
    return ReportService;
})();
exports.ReportService = ReportService;
//# sourceMappingURL=report.service.js.map