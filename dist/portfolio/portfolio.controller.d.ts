import { GetListDto, GetDto, DeleteDto } from 'src/common';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
export declare class PortfolioController {
    private portfolioService;
    constructor(portfolioService: PortfolioService);
    uploadFile(file: any): Promise<any>;
    getImage(pdf: any, res: any): Promise<any>;
    getList(getListDto: GetListDto, req: any): Promise<any>;
    get(getDto: GetDto, req: any): Promise<any>;
    create(createPortfolioDto: CreatePortfolioDto, req: any): Promise<any>;
    update(updatePortfolioDto: UpdatePortfolioDto, getDto: GetDto): Promise<any>;
    delete(deleteDto: DeleteDto, req: any): Promise<any>;
}
