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
exports.ResourcesController = void 0;
const common_1 = require("@nestjs/common");
const resources_service_1 = require("./resources.service");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const common_2 = require("../common");
const create_resources_dto_1 = require("./dto/create-resources.dto");
const update_resources_dto_1 = require("./dto/update-resources.dto");
let ResourcesController = (() => {
    let ResourcesController = class ResourcesController {
        constructor(resourcesService) {
            this.resourcesService = resourcesService;
        }
        async create(createResourcesDto) {
            return await this.resourcesService.createResources(createResourcesDto);
        }
        async getList(getListDto) {
            return await this.resourcesService.getListResources(getListDto);
        }
        async getAccount(getDto) {
            return await this.resourcesService.getResources(getDto);
        }
        async delete(deleteDto) {
            return await this.resourcesService.deleteResources(deleteDto);
        }
        async update(getDto, updateResourcesDto) {
            return await this.resourcesService.updateResources(getDto, updateResourcesDto);
        }
    };
    __decorate([
        common_1.Post(),
        roles_decorator_1.Roles("ADMIN", "MINISTRY"),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
        __param(0, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [create_resources_dto_1.CreateResourcesDto]),
        __metadata("design:returntype", Promise)
    ], ResourcesController.prototype, "create", null);
    __decorate([
        common_1.Get(),
        roles_decorator_1.Roles("ADMIN", "MINISTRY"),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
        __param(0, common_1.Query()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [common_2.GetListDto]),
        __metadata("design:returntype", Promise)
    ], ResourcesController.prototype, "getList", null);
    __decorate([
        common_1.Get(":_id"),
        roles_decorator_1.Roles("ADMIN", "MINISTRY"),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
        __param(0, common_1.Param()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [common_2.GetDto]),
        __metadata("design:returntype", Promise)
    ], ResourcesController.prototype, "getAccount", null);
    __decorate([
        common_1.Delete(':_id'),
        roles_decorator_1.Roles("ADMIN", "MINISTRY"),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
        __param(0, common_1.Param()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [common_2.DeleteDto]),
        __metadata("design:returntype", Promise)
    ], ResourcesController.prototype, "delete", null);
    __decorate([
        common_1.Put(':_id'),
        roles_decorator_1.Roles("MINISTRY"),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
        __param(0, common_1.Param()), __param(1, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [common_2.GetDto, update_resources_dto_1.UpdateResourcesDto]),
        __metadata("design:returntype", Promise)
    ], ResourcesController.prototype, "update", null);
    ResourcesController = __decorate([
        common_1.Controller('resources'),
        __metadata("design:paramtypes", [resources_service_1.ResourcesService])
    ], ResourcesController);
    return ResourcesController;
})();
exports.ResourcesController = ResourcesController;
//# sourceMappingURL=resources.controller.js.map