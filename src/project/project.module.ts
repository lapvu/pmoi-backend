import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectSchema } from './schema/project.schema';
import { NotificationModule } from 'src/notification/notification.module';
import { autoIncrement } from 'mongoose-plugin-autoinc';
@Module({
  imports: [MongooseModule.forFeatureAsync([{
    name: 'Project', useFactory: () => {
      const schema = ProjectSchema;
      schema.plugin(autoIncrement, "Project");
      return schema;
    },
  }]), NotificationModule],
  providers: [ProjectService],
  controllers: [ProjectController],
  exports: [ProjectService]
})
export class ProjectModule { }
