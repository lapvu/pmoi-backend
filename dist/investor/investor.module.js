"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvestorModule = void 0;
const common_1 = require("@nestjs/common");
const investor_service_1 = require("./investor.service");
const investor_controller_1 = require("./investor.controller");
const account_module_1 = require("../account/account.module");
let InvestorModule = (() => {
    let InvestorModule = class InvestorModule {
    };
    InvestorModule = __decorate([
        common_1.Module({
            imports: [account_module_1.AccountModule],
            providers: [investor_service_1.InvestorService],
            controllers: [investor_controller_1.InvestorController]
        })
    ], InvestorModule);
    return InvestorModule;
})();
exports.InvestorModule = InvestorModule;
//# sourceMappingURL=investor.module.js.map