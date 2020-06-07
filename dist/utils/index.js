"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertQueryParams = void 0;
const common_1 = require("../common");
exports.convertQueryParams = (getListDto) => {
    let _end = getListDto._end ? parseInt(getListDto._end) : null;
    let _order = getListDto._order ? getListDto._order : null;
    let _sort = getListDto._sort ? getListDto._sort : null;
    let _start = getListDto._start ? parseInt(getListDto._start) : null;
    let _id = getListDto.id ? { _id: { $in: getListDto.id.split(",") } } : null;
    let q = getListDto.q ? { $or: [{ email: new RegExp(getListDto.q, 'i') }, { name: new RegExp(getListDto.q, 'i') }] } : null;
    return {
        _limit: _end - _start,
        _offset: _start,
        _sort: {
            [_sort === "id" ? "_id" : _sort]: _order === "ASC" ? 1 : -1
        },
        _filter: _id || q || {}
    };
};
//# sourceMappingURL=index.js.map