import * as mongoose from 'mongoose';

export const DisbursementSchema = new mongoose.Schema({
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
})