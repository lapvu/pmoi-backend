import { DisbursementService } from './disbursement.service';
import { GetListDto, GetDto } from 'src/common';
import { CreateDisbursementDto } from './dto/create-disbursement.dto';
import { UpdateDisbursementDto } from './dto/update-disbursement.dto';
export declare class DisbursementController {
    private disbursementService;
    constructor(disbursementService: DisbursementService);
    create(createDisbursementDto: CreateDisbursementDto): Promise<any>;
    getList(getListDto: GetListDto): Promise<any>;
    get(getDto: GetDto): Promise<any>;
    update(getDto: GetDto, updateDisbursementDto: UpdateDisbursementDto): Promise<any>;
    delete(getDto: GetDto): Promise<any>;
}
