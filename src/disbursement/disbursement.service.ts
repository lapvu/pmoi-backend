import { Injectable } from '@nestjs/common';
import { GetListDto, GetDto, DeleteDto } from 'src/common';
import { CreateDisbursementDto } from './dto/create-disbursement.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { convertQueryParams } from 'src/utils';
import { UpdateDisbursementDto } from './dto/update-disbursement.dto';

@Injectable()
export class DisbursementService {
    constructor(@InjectModel('Disbursement') private disbursementModel: Model<Document>) { }

    async createDisbursement(createDisbursementDto: CreateDisbursementDto): Promise<any> {
        let disbursement = new this.disbursementModel(createDisbursementDto);
        let data = await disbursement.save();
        return {
            data
        }
    }

    async getListDisbursement(getListDto: GetListDto): Promise<any> {
        const query = convertQueryParams(getListDto);
        const result = await this.disbursementModel
            .find(query._filter)
            .populate('projectId', { name: 1 })
            .skip(query._offset)
            .limit(query._limit)
            .sort(query._sort);
        const total = await this.disbursementModel.count(query._filter);
        return {
            data: result,
            total
        };
    }

    async getDisbursement(getDto: GetDto): Promise<any> {
        let data = await this.disbursementModel.findOne(getDto).populate('projectId', { name: 1 })
        return {
            data
        }
    }

    async updateDisbursement(getDto: GetDto, updateDisbursementDto: UpdateDisbursementDto): Promise<any> {
        let result = await this.disbursementModel.updateOne(getDto, updateDisbursementDto)
        return {
            data: result
        }
    }

    async deleteDisbursement(deleteDto: DeleteDto): Promise<any> {
        let data = await this.disbursementModel.deleteOne(deleteDto)
        return {
            data
        }
    }
}
