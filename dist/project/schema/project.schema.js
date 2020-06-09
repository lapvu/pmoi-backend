"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectSchema = void 0;
const mongoose = require("mongoose");
const randomString = require("randomstring");
exports.ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    treasuryAddress: {
        type: String,
        required: true
    },
    map: {
        type: String
    },
    constructionTime: {
        type: String
    },
    completionTime: {
        type: String,
    },
    managementForm: {
        type: String
    },
    typeSource: {
        type: String
    },
    desc: {
        type: String,
    },
    totalInvestment: {
        type: String
    },
    place: {
        type: [String]
    },
    approvedInvestment: {
        type: String
    },
    initInvestment: {
        type: String
    },
    approvedInvestmentTime: {
        type: Date
    },
    initInvestmentTime: {
        type: Date
    },
    childProjects: [{
            name: { type: String },
            investor: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Account'
            },
            desc: { type: String }
        }],
    _id: {
        type: String,
        default: randomString.generate({
            length: 7,
            charset: "numeric"
        })
    },
    investor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    hasChildProject: {
        type: Boolean
    }
}, { timestamps: { createdAt: "created_at" } });
exports.ProjectSchema.pre('save', function (next) {
    let project = this;
    project.hasChildProject ? project.investor = null : project.childProjects = null;
    next();
});
exports.ProjectSchema.pre('update', function (next) {
    let project = this;
    project.hasChildProject ? project.investor = null : project.childProjects = null;
    next();
});
//# sourceMappingURL=project.schema.js.map