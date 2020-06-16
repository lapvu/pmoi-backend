import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { NotificationModule } from 'src/notification/notification.module';
import { MulterModule } from '@nestjs/platform-express';
import { ProjectModule } from 'src/project/project.module';
import { ReportService } from './report.service';

@Module({
  imports: [
    NotificationModule,
    ProjectModule,
    MulterModule.register({
      dest: './upload',
    })
  ]
  ,
  providers: [ReportService],
  controllers: [ReportController]
})
export class ReportModule { }
