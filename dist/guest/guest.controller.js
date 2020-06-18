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
exports.GuestController = void 0;
const common_1 = require("@nestjs/common");
const project_service_1 = require("../project/project.service");
const common_2 = require("../common");
const account_service_1 = require("../account/account.service");
let GuestController = (() => {
    let GuestController = class GuestController {
        constructor(projectService, accountSerive) {
            this.projectService = projectService;
            this.accountSerive = accountSerive;
        }
        async getListProject(getListDto) {
            return this.projectService.getListProject(getListDto, { accountType: null });
        }
        async getListInvestor(getListDto) {
            return this.accountSerive.getListInvestor(getListDto);
        }
        async getProject(getDto) {
            return this.projectService.getProject(getDto);
        }
        async getInvestor(getDto) {
            return this.accountSerive.getInvestor(getDto);
        }
    };
    __decorate([
        common_1.Get("project"),
        __param(0, common_1.Query()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [common_2.GetListDto]),
        __metadata("design:returntype", Promise)
    ], GuestController.prototype, "getListProject", null);
    __decorate([
        common_1.Get("investor"),
        __param(0, common_1.Query()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [common_2.GetListDto]),
        __metadata("design:returntype", Promise)
    ], GuestController.prototype, "getListInvestor", null);
    __decorate([
        common_1.Get("project/:_id"),
        __param(0, common_1.Query()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [common_2.GetDto]),
        __metadata("design:returntype", Promise)
    ], GuestController.prototype, "getProject", null);
    __decorate([
        common_1.Get("investor/:_id"),
        __param(0, common_1.Query()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [common_2.GetDto]),
        __metadata("design:returntype", Promise)
    ], GuestController.prototype, "getInvestor", null);
    GuestController = __decorate([
        common_1.Controller('guest'),
        __metadata("design:paramtypes", [project_service_1.ProjectService, account_service_1.AccountService])
    ], GuestController);
    return GuestController;
})();
exports.GuestController = GuestController;
//# sourceMappingURL=guest.controller.js.map