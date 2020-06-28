"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisbursementSchema = void 0;
const mongoose = require("mongoose");
exports.DisbursementSchema = new mongoose.Schema({
    time: {
        type: String,
        unique: true
    },
    value: [
        {
            name: {
                type: String
            },
            amount: {
                type: Number,
            }
        }
    ],
    projectId: {
        type: String,
        ref: "Project"
    }
});
//# sourceMappingURL=disbursement.schema.js.map