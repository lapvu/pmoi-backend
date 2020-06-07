import { GetListDto } from "src/common";
export declare const convertQueryParams: (getListDto: GetListDto) => {
    _limit: number;
    _offset: number;
    _sort: {
        [x: string]: number;
    };
    _filter: {};
};
