import * as mongoose from 'mongoose';

export const ReportSchema = new mongoose.Schema({
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
}, { timestamps: { createdAt: "created_at" } })

export const PortfolioSchema = new mongoose.Schema({
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

export const ChildProjectSchema = new mongoose.Schema({
    name: { type: String },
    investor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    desc: { type: String },
    portfolios: [{
        type: PortfolioSchema,
        default: null
    }],
    reports: [{
        type: ReportSchema,
        default: null
    }]
}, { timestamps: { createdAt: "created_at" } })

export const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
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
        type: String,
        unique: true
    },
    //QD dự án đầu tư ban đầu
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
        type: ChildProjectSchema,
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
        type: ReportSchema,
        default: null
    }],
    portfolios: [{
        type: PortfolioSchema,
        default: null
    }]
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