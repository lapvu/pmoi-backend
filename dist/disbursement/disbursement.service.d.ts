import { GetListDto, GetDto, DeleteDto } from 'src/common';
import { CreateDisbursementDto } from './dto/create-disbursement.dto';
import { Model, Document } from 'mongoose';
import { UpdateDisbursementDto } from './dto/update-disbursement.dto';
export declare class DisbursementService {
    private disbursementModel;
    constructor(disbursementModel: Model<Document>);
    createDisbursement(createDisbursementDto: CreateDisbursementDto): Promise<any>;
    getListDisbursement(getListDto: GetListDto): Promise<any>;
    getDisbursement(getDto: GetDto): Promise<any>;
    updateDisbursement(getDto: GetDto, updateDisbursementDto: UpdateDisbursementDto): Promise<any>;
    deleteDisbursement(deleteDto: DeleteDto): Promise<any>;
}
