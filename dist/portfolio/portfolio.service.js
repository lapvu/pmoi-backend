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
exports.PortfolioService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const project_service_1 = require("../project/project.service");
const common_2 = require("../common");
const utils_1 = require("../utils");
let PortfolioService = (() => {
    let PortfolioService = class PortfolioService {
        constructor(projectService) {
            this.projectService = projectService;
        }
        async createPortfolio(createPortfolioDto) {
            if (mongoose_1.Types.ObjectId.isValid(createPortfolioDto.projectId.toString())) {
                let record = await this.projectService.projectModel.findOne({ "childProjects._id": createPortfolioDto.projectId });
                record.childProjects.forEach((e, i) => {
                    if (e._id == createPortfolioDto.projectId.toString()) {
                        record.childProjects[i].portfolios.push(Object.assign({}, createPortfolioDto));
                    }
                });
                let data = await record.save();
                return {
                    data
                };
            }
            else {
                let record = await this.projectService.projectModel.findOne({ _id: parseInt(createPortfolioDto.projectId) });
                record.portfolios.push(Object.assign({}, createPortfolioDto));
                let data = await record.save();
                return {
                    data
                };
            }
        }
        async getListPortfolio(getListDto, user) {
            let query = utils_1.convertQueryParams(getListDto);
            const q = [
                {
                    $match: {
                        $or: [{ investor: mongoose_1.Types.ObjectId(user._id) }, { "childProjects.investor": mongoose_1.Types.ObjectId(user._id) }]
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
            ];
            const data = await this.projectService.projectModel.aggregate([
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
            ]);
            const count = await this.projectService.projectModel.aggregate([
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
        async getPortfolio(getDto, user) {
            const q = [
                {
                    $match: {
                        $or: [{ investor: mongoose_1.Types.ObjectId(user._id) }, { "childProjects.investor": mongoose_1.Types.ObjectId(user._id) }]
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
                    $match: { _id: mongoose_1.Types.ObjectId(getDto._id) }
                },
            ];
            let data = await this.projectService.projectModel.aggregate(q);
            return {
                data: data[0]
            };
        }
        async updatePortfolio(updatePortfolioDto, getDto) {
            let record = await this.projectService.projectModel.findOne({
                $or: [
                    { "portfolios._id": mongoose_1.Types.ObjectId(getDto._id) },
                    { "childProjects.portfolios._id": mongoose_1.Types.ObjectId(getDto._id) }
                ]
            });
            if (record.hasChildProject) {
                record.childProjects.forEach((e, i) => {
                    if (record.childProjects[i]._id == updatePortfolioDto.projectId) {
                        record.childProjects[i].portfolios.forEach((element, index) => {
                            if (record.childProjects[i].portfolios[index]._id == getDto._id) {
                                record.childProjects[i].portfolios[index] = updatePortfolioDto;
                            }
                        });
                    }
                });
                let data = await this.projectService.projectModel.updateOne({
                    $or: [
                        { "portfolios._id": mongoose_1.Types.ObjectId(getDto._id) },
                        { "childProjects.portfolios._id": mongoose_1.Types.ObjectId(getDto._id) }
                    ]
                }, record);
                return {
                    data
                };
            }
            else {
                record.portfolios.forEach((e, i) => {
                    if (record.portfolios[i]._id == getDto._id) {
                        record.portfolios[i] = updatePortfolioDto;
                    }
                });
                let data = await this.projectService.projectModel.updateOne({
                    $or: [
                        { "portfolios._id": mongoose_1.Types.ObjectId(getDto._id) },
                        { "childProjects.portfolios._id": mongoose_1.Types.ObjectId(getDto._id) }
                    ]
                }, record);
                return {
                    data
                };
            }
        }
        async deletePortfolio(deleteDto, user) {
            let record = await this.projectService.projectModel.findOne({
                $or: [
                    { "portfolios._id": mongoose_1.Types.ObjectId(deleteDto._id) },
                    { "childProjects.portfolios._id": mongoose_1.Types.ObjectId(deleteDto._id) }
                ]
            });
            if (record.hasChildProject) {
                record.childProjects.forEach((e, i) => {
                    if (record.childProjects[i].investor.toString() == user._id.toString()) {
                        record.childProjects[i].portfolios.forEach((element, index) => {
                            if (record.childProjects[i].portfolios[index]._id == deleteDto._id) {
                                record.childProjects[i].portfolios.splice(index, 1);
                            }
                        });
                    }
                });
                let data = await this.projectService.projectModel.update({
                    $or: [
                        { "portfolios._id": mongoose_1.Types.ObjectId(deleteDto._id) },
                        { "childProjects.portfolios._id": mongoose_1.Types.ObjectId(deleteDto._id) }
                    ]
                }, record);
                return {
                    data
                };
            }
            else {
                let data = await this.projectService.projectModel.update({
                    $or: [
                        { "portfolios._id": mongoose_1.Types.ObjectId(deleteDto._id) },
                        { "childProjects.portfolios._id": mongoose_1.Types.ObjectId(deleteDto._id) }
                    ]
                }, {
                    $pull: { portfolios: { _id: mongoose_1.Types.ObjectId(deleteDto._id) } }
                });
                return {
                    data
                };
            }
        }
    };
    PortfolioService = __decorate([
        common_1.Injectable(),
        __metadata("design:paramtypes", [project_service_1.ProjectService])
    ], PortfolioService);
    return PortfolioService;
})();
exports.PortfolioService = PortfolioService;
//# sourceMappingURL=portfolio.service.js.map