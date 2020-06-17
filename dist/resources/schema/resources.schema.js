"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourcesSchema = void 0;
const mongoose = require("mongoose");
exports.ResourcesSchema = new mongoose.Schema({
    name: {
        type: String
    },
    sortName: {
        type: String
    },
    desc: {
        type: String
    }
}, { timestamps: { createdAt: "created_at" } });
//# sourceMappingURL=resources.schema.js.map