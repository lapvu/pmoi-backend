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
exports.ProjectController = void 0;
const common_1 = require("@nestjs/common");
const project_service_1 = require("./project.service");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const common_2 = require("../common");
const create_project_dto_1 = require("./dto/create-project.dto");
let ProjectController = (() => {
    let ProjectController = class ProjectController {
        constructor(projectsService) {
            this.projectsService = projectsService;
        }
        async getList(getListDto) {
            return await this.projectsService.getListProject(getListDto);
        }
        async createProject(createProjectDto) {
            return await this.projectsService.createProject(createProjectDto);
        }
        async getProject(getProjectDto) {
            return await this.projectsService.getProject(getProjectDto);
        }
        async delete(deleteProjectDto) {
            return await this.projectsService.deleteProject(deleteProjectDto);
        }
        async update(getProjectDto, updateProjectDto) {
            return await this.projectsService.updateProject(getProjectDto, updateProjectDto);
        }
    };
    __decorate([
        common_1.Get(),
        roles_decorator_1.Roles("ADMIN", "MINISTRY"),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
        __param(0, common_1.Query()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [common_2.GetListDto]),
        __metadata("design:returntype", Promise)
    ], ProjectController.prototype, "getList", null);
    __decorate([
        common_1.Post(),
        roles_decorator_1.Roles("ADMIN", "MINISTRY"),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
        __param(0, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [create_project_dto_1.CreateProjectDto]),
        __metadata("design:returntype", Promise)
    ], ProjectController.prototype, "createProject", null);
    __decorate([
        common_1.Get(":_id"),
        roles_decorator_1.Roles("ADMIN", "MINISTRY"),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
        __param(0, common_1.Param()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [common_2.GetDto]),
        __metadata("design:returntype", Promise)
    ], ProjectController.prototype, "getProject", null);
    __decorate([
        common_1.Delete(":_id"),
        roles_decorator_1.Roles("ADMIN", "MINISTRY"),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
        __param(0, common_1.Param()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [common_2.DeleteDto]),
        __metadata("design:returntype", Promise)
    ], ProjectController.prototype, "delete", null);
    __decorate([
        common_1.Put(":_id"),
        roles_decorator_1.Roles("ADMIN", "MINISTRY"),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
        __param(0, common_1.Param()), __param(1, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [common_2.GetDto, create_project_dto_1.CreateProjectDto]),
        __metadata("design:returntype", Promise)
    ], ProjectController.prototype, "update", null);
    ProjectController = __decorate([
        common_1.Controller('project'),
        __metadata("design:paramtypes", [project_service_1.ProjectService])
    ], ProjectController);
    return ProjectController;
})();
exports.ProjectController = ProjectController;
//# sourceMappingURL=project.controller.js.map