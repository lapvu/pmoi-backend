"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourcesSchema = void 0;
const mongoose = require("mongoose");
exports.ResourcesSchema = new mongoose.Schema({
    name: {
        type: String
    },
    shortName: {
        type: String
    },
    desc: {
        type: String
    },
    time: {
        type: String,
    },
    amount: {
        type: Number
    }
}, { timestamps: { createdAt: "created_at" } });
//# sourceMappingURL=resources.schema.js.map