import { Module } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { ResourcesController } from './resources.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ResourcesSchema } from './schema/resources.schema';

@Module({
  providers: [ResourcesService],
  controllers: [ResourcesController],
  imports: [MongooseModule.forFeature([{ name: 'Resources', schema: ResourcesSchema }])]
})
export class ResourcesModule { }
