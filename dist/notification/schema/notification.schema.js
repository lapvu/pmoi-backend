"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationSchema = void 0;
const mongoose = require("mongoose");
exports.NotificationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    seen: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Account',
            default: null
        }],
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    recipients: {
        type: String,
    }
}, { timestamps: { createdAt: "created_at" } });
//# sourceMappingURL=notification.schema.js.map