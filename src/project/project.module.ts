import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectSchema } from './schema/project.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Project', schema: ProjectSchema }])],
  providers: [ProjectService],
  controllers: [ProjectController]
})
export class ProjectModule { }
