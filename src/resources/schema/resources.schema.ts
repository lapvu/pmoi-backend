import * as mongoose from 'mongoose';

export const ResourcesSchema = new mongoose.Schema({
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
