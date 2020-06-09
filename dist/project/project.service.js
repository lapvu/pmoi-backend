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
let ProjectService = (() => {
    let ProjectService = class ProjectService {
        constructor(projectModel) {
            this.projectModel = projectModel;
        }
        async getListProject(getlistDto) {
            const query = utils_1.convertQueryParams(getlistDto);
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
        async createProject(createProjectDto) {
            const project = new this.projectModel(createProjectDto);
            return await project.save();
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
            return await this.projectModel.updateOne(getProjectdto, updateProjectDto);
        }
    };
    ProjectService = __decorate([
        common_1.Injectable(),
        __param(0, mongoose_1.InjectModel('Project')),
        __metadata("design:paramtypes", [mongoose_2.Model])
    ], ProjectService);
    return ProjectService;
})();
exports.ProjectService = ProjectService;
//# sourceMappingURL=project.service.js.map