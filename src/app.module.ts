import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { ProjectsModule } from './projects/projects.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://admin:123456vn@lapvu-qs9qs.mongodb.net/pm?retryWrites=true&w=majority'), AuthModule, AccountModule, ProjectsModule],
  controllers: [],
  providers: [],
})

export class AppModule { }
