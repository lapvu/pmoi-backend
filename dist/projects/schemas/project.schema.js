"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectSchema = void 0;
const mongoose = require("mongoose");
exports.ProjectSchema = new mongoose.Schema({
    name: String,
    treasury: String,
    map: String,
    investor: String,
    constructionTime: String,
    completionTime: String,
    managementForm: String,
    typeSource: String,
    desc: String,
    totInvestment: Number,
    place: String
});
//# sourceMappingURL=project.schema.js.map