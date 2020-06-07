import * as mongoose from 'mongoose';
import * as randomString from "randomstring"
export const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    //dia chi kho bac
    treasuryAddress: {
        type: String,
        required: true
    },
    //map
    map: {
        type: String
    },
    //thoi gian thi cong
    constructionTime: {
        type: String
    },
    //thoi gian hoan thanh
    completionTime: {
        type: String,
    },
    //hinh thuc quan ly
    managementForm: {
        type: String
    },
    //loai nguon von
    typeSource: {
        type: String
    },
    //mo ta du an
    desc: {
        type: String,
    },
    //tong muc dau tu
    totalInvestment: {
        type: String
    },
    //dia diem thuc hien
    place: {
        type: [String]
    },
    //QD duyệt chủ trương đầu tư
    approvedInvestment: {
        type: String
    },
    //QD dự án đầu tư ban đầu
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


ProjectSchema.pre<any>('save', function (next) {
    let project = this;
    project.hasChildProject ? project.investor = null : project.childProjects = null
    next();
});

ProjectSchema.pre<any>('update', function (next) {
    let project = this;
    project.hasChildProject ? project.investor = null : project.childProjects = null
    next();
});