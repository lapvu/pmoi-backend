import { Module } from '@nestjs/common';
import { DisbursementService } from './disbursement.service';
import { DisbursementController } from './disbursement.controller';
import { ProjectModule } from 'src/project/project.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DisbursementSchema } from './schema/disbursement.schema';

@Module({
  providers: [DisbursementService],
  controllers: [DisbursementController],
  imports:[MongooseModule.forFeature([{ name: 'Disbursement', schema: DisbursementSchema }]),ProjectModule]
})

export class DisbursementModule {}
