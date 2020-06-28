"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectSchema = exports.ChildProjectSchema = exports.PortfolioSchema = exports.ReportSchema = void 0;
const mongoose = require("mongoose");
exports.ReportSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String
    },
    attachment: {
        type: Object,
    },
    investor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
}, { timestamps: { createdAt: "created_at" } });
exports.PortfolioSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    builder: {
        type: String
    },
    winBidTime: {
        type: Date
    },
    attachment: {
        type: Object
    },
    desc: {
        type: String
    },
    project: {
        type: String,
        ref: "Project"
    }
}, { timestamps: { createdAt: "created_at" } });
exports.ChildProjectSchema = new mongoose.Schema({
    name: { type: String },
    investor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    desc: { type: String },
    portfolios: [{
            type: exports.PortfolioSchema,
            default: null
        }],
    reports: [{
            type: exports.ReportSchema,
            default: null
        }]
}, { timestamps: { createdAt: "created_at" } });
exports.ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
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
        type: String,
        unique: true
    },
    initInvestment: {
        type: String,
        unique: true
    },
    approvedInvestmentTime: {
        type: Date
    },
    initInvestmentTime: {
        type: Date
    },
    childProjects: [{
            type: exports.ChildProjectSchema,
            default: null
        }],
    investor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    hasChildProject: {
        type: Boolean
    },
    reports: [{
            type: exports.ReportSchema,
            default: null
        }],
    portfolios: [{
            type: exports.PortfolioSchema,
            default: null
        }]
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