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
exports.ProjectsController = void 0;
const common_1 = require("@nestjs/common");
const projects_service_1 = require("./projects.service");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const list_account_dto_1 = require("../account/dto/list-account.dto");
let ProjectsController = (() => {
    let ProjectsController = class ProjectsController {
        constructor(projectsService) {
            this.projectsService = projectsService;
        }
        async getList(getListDto) {
            return await this.projectsService.getListProject(getListDto);
        }
    };
    __decorate([
        common_1.Get(),
        roles_decorator_1.Roles("ADMIN"),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
        __param(0, common_1.Query()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [list_account_dto_1.GetListDto]),
        __metadata("design:returntype", Promise)
    ], ProjectsController.prototype, "getList", null);
    ProjectsController = __decorate([
        common_1.Controller('project'),
        __metadata("design:paramtypes", [projects_service_1.ProjectsService])
    ], ProjectsController);
    return ProjectsController;
})();
exports.ProjectsController = ProjectsController;
//# sourceMappingURL=projects.controller.js.map