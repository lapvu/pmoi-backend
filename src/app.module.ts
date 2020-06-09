import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { ProjectModule } from './project/project.module';
import { InvestorModule } from './investor/investor.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://admin:123456vn@lapvu-qs9qs.mongodb.net/pm?retryWrites=true&w=majority'), AuthModule, AccountModule, ProjectModule, InvestorModule],
  controllers: [],
  providers: [],
})

export class AppModule { }
