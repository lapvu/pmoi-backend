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
            investors: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Account'
            }
        }],
    _id: {
        type: String,
        default: randomString.generate({
            length: 7,
            charset: "numeric"
        })
    }
}, { timestamps: { createdAt: "created_at" } });
//# sourceMappingURL=project.schema.js.map