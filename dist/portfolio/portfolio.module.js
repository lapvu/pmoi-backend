"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioModule = void 0;
const common_1 = require("@nestjs/common");
const portfolio_service_1 = require("./portfolio.service");
const portfolio_controller_1 = require("./portfolio.controller");
const notification_module_1 = require("../notification/notification.module");
const project_module_1 = require("../project/project.module");
let PortfolioModule = (() => {
    let PortfolioModule = class PortfolioModule {
    };
    PortfolioModule = __decorate([
        common_1.Module({
            imports: [
                notification_module_1.NotificationModule,
                project_module_1.ProjectModule
            ],
            providers: [portfolio_service_1.PortfolioService],
            controllers: [portfolio_controller_1.PortfolioController]
        })
    ], PortfolioModule);
    return PortfolioModule;
})();
exports.PortfolioModule = PortfolioModule;
//# sourceMappingURL=portfolio.module.js.map