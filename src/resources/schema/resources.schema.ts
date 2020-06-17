import * as mongoose from 'mongoose';

export const ResourcesSchema = new mongoose.Schema({
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
