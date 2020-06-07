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
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const list_account_dto_1 = require("../account/dto/list-account.dto");
let ProjectsService = (() => {
    let ProjectsService = class ProjectsService {
        constructor(projectModel) {
            this.projectModel = projectModel;
        }
        async getListProject(getlistDto) {
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
        async createProject() {
        }
    };
    ProjectsService = __decorate([
        common_1.Injectable(),
        __param(0, mongoose_1.InjectModel('Project')),
        __metadata("design:paramtypes", [mongoose_2.Model])
    ], ProjectsService);
    return ProjectsService;
})();
exports.ProjectsService = ProjectsService;
//# sourceMappingURL=projects.service.js.map