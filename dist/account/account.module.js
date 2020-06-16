"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountModule = void 0;
const common_1 = require("@nestjs/common");
const account_service_1 = require("./account.service");
const account_controller_1 = require("./account.controller");
const mongoose_1 = require("@nestjs/mongoose");
const account_schema_1 = require("./schema/account.schema");
const notification_module_1 = require("../notification/notification.module");
let AccountModule = (() => {
    let AccountModule = class AccountModule {
    };
    AccountModule = __decorate([
        common_1.Module({
            imports: [mongoose_1.MongooseModule.forFeature([{ name: 'Account', schema: account_schema_1.AccountSchema }]), notification_module_1.NotificationModule],
            providers: [account_service_1.AccountService],
            exports: [account_service_1.AccountService],
            controllers: [account_controller_1.AccountController],
        })
    ], AccountModule);
    return AccountModule;
})();
exports.AccountModule = AccountModule;
//# sourceMappingURL=account.module.js.map