"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("./auth/auth.module");
const account_module_1 = require("./account/account.module");
const project_module_1 = require("./project/project.module");
const investor_module_1 = require("./investor/investor.module");
const notification_module_1 = require("./notification/notification.module");
const report_module_1 = require("./report/report.module");
const investment_module_1 = require("./investment/investment.module");
const portfolio_module_1 = require("./portfolio/portfolio.module");
const guest_module_1 = require("./guest/guest.module");
const resources_module_1 = require("./resources/resources.module");
let AppModule = (() => {
    let AppModule = class AppModule {
    };
    AppModule = __decorate([
        common_1.Module({
            imports: [mongoose_1.MongooseModule.forRoot('mongodb+srv://admin:123456vn@lapvu-qs9qs.mongodb.net/pm?retryWrites=true&w=majority'),
                auth_module_1.AuthModule,
                account_module_1.AccountModule,
                project_module_1.ProjectModule,
                investor_module_1.InvestorModule,
                notification_module_1.NotificationModule,
                report_module_1.ReportModule,
                investment_module_1.InvestmentModule,
                portfolio_module_1.PortfolioModule,
                guest_module_1.GuestModule,
                resources_module_1.ResourcesModule],
            controllers: [],
            providers: [],
        })
    ], AppModule);
    return AppModule;
})();
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map