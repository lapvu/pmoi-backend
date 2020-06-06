import * as mongoose from 'mongoose';

export const ProjectSchema = new mongoose.Schema({
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
