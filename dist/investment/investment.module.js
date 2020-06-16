"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvestmentModule = void 0;
const common_1 = require("@nestjs/common");
const investment_service_1 = require("./investment.service");
const investment_controller_1 = require("./investment.controller");
const project_module_1 = require("../project/project.module");
let InvestmentModule = (() => {
    let InvestmentModule = class InvestmentModule {
    };
    InvestmentModule = __decorate([
        common_1.Module({
            providers: [investment_service_1.InvestmentService],
            controllers: [investment_controller_1.InvestmentController],
            imports: [project_module_1.ProjectModule]
        })
    ], InvestmentModule);
    return InvestmentModule;
})();
exports.InvestmentModule = InvestmentModule;
//# sourceMappingURL=investment.module.js.map