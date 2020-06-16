import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { ProjectModule } from './project/project.module';
import { InvestorModule } from './investor/investor.module';
import { NotificationModule } from './notification/notification.module';
import { ReportModule } from './report/report.module';
import { InvestmentModule } from './investment/investment.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { GuestModule } from './guest/guest.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://admin:123456vn@lapvu-qs9qs.mongodb.net/pm?retryWrites=true&w=majority'),
    AuthModule,
    AccountModule,
    ProjectModule,
    InvestorModule,
    NotificationModule,
    ReportModule,
    InvestmentModule,
    PortfolioModule,
    GuestModule],
  controllers: [],
  providers: [],
})

export class AppModule { }
