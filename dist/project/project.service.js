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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const common_2 = require("../common");
const utils_1 = require("../utils");
const notification_service_1 = require("../notification/notification.service");
let ProjectService = (() => {
    let ProjectService = class ProjectService {
        constructor(projectModel, notificationService) {
            this.projectModel = projectModel;
            this.notificationService = notificationService;
        }
        async getListProject(getlistDto, user) {
            const query = utils_1.convertQueryParams(getlistDto);
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
                                    if: { $eq: ["$childProjects", null] },
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
                            desc: {
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
                ]);
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
        async createProject(createProjectDto, _id) {
            try {
                const project = new this.projectModel(createProjectDto);
                const result = await project.save();
                return result;
            }
            catch (err) {
                if (err.code === 11000 && err.keyPattern.name === 1) {
                    throw new common_1.NotFoundException("Tên dự án đã tồn tại!");
                }
                if (err.code === 11000 && err.keyPattern.approvedInvestment === 1) {
                    throw new common_1.NotFoundException("QD duyệt chủ trương đầu tư đã tồn tại!");
                }
                if (err.code === 11000 && err.keyPattern.initInvestment === 1) {
                    throw new common_1.NotFoundException("QD dự án đầu tư ban đầu đã tồn tại!");
                }
                throw new common_1.NotFoundException(err);
            }
        }
        async getProject(getProjectdto) {
            const result = await this.projectModel.findOne(getProjectdto)
                .populate("childProjects.investor", "investorName")
                .populate("investor", "investorName");
            return {
                data: result
            };
        }
        async deleteProject(deleteDto) {
            return await this.projectModel.deleteOne(deleteDto);
        }
        async updateProject(getProjectdto, updateProjectDto) {
            let data = await this.projectModel.updateOne(getProjectdto, updateProjectDto);
            return {
                data
            };
        }
    };
    ProjectService = __decorate([
        common_1.Injectable(),
        __param(0, mongoose_1.InjectModel('Project')),
        __metadata("design:paramtypes", [mongoose_2.Model, notification_service_1.NotificationService])
    ], ProjectService);
    return ProjectService;
})();
exports.ProjectService = ProjectService;
//# sourceMappingURL=project.service.js.map