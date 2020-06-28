import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { ProjectModule } from './project/project.module';
import { InvestorModule } from './investor/investor.module';
import { NotificationModule } from './notification/notification.module';
import { ReportModule } from './report/report.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { GuestModule } from './guest/guest.module';
import { ResourcesModule } from './resources/resources.module';
import { DisbursementModule } from './disbursement/disbursement.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://admin:123456vn@lapvu-qs9qs.mongodb.net/pm?retryWrites=true&w=majority'),
    AuthModule,
    AccountModule,
    ProjectModule,
    InvestorModule,
    NotificationModule,
    ReportModule,
    PortfolioModule,
    GuestModule,
    ResourcesModule,
    DisbursementModule],
  controllers: [],
  providers: [],
})

export class AppModule { }
