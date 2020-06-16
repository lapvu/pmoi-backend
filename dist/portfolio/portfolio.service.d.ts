import { ProjectService } from 'src/project/project.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { GetListDto, GetDto, DeleteDto } from 'src/common';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
export declare class PortfolioService {
    private projectService;
    constructor(projectService: ProjectService);
    createPortfolio(createPortfolioDto: CreatePortfolioDto): Promise<any>;
    getListPortfolio(getListDto: GetListDto, user: any): Promise<any>;
    getPortfolio(getDto: GetDto, user: any): Promise<any>;
    updatePortfolio(updatePortfolioDto: UpdatePortfolioDto, getDto: GetDto): Promise<any>;
    deletePortfolio(deleteDto: DeleteDto, user: any): Promise<any>;
}
