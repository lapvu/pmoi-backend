import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const AccountSchema = new mongoose.Schema({
    ministryName: {
        type: String,
        default: "Bộ Nông nghiệp và Phát triển nông thôn"
    },
    investorName: {
        type: String,
        trim: true,
        index: true,
        unique: true,
        sparse: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    address: {
        type: String
    },
    phoneNumber: {
        type: Number,
    },
    fax: {
        type: String
    },
    roles: {
        type: [String],
        default: ["INVESTOR"],
        required: true
    },
    accountType: {
        type: String,
        default: "INVESTOR"
    },
    website: {
        type: String
    },
    desc: {
        type: String
    }
}, { timestamps: { createdAt: "created_at" } });

AccountSchema.pre<any>('save', function (next) {
    let account = this;
    account.accountType === "INVESTOR" ? account.roles = ["INVESTOR"] : null
    account.accountType === "MINISTRY" ? account.roles = ["MINISTRY"] : null
    if (!account.isModified('password')) return next();
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(account.password, salt, (err, hash) => {
            if (err) return next(err);
            account.password = hash;
            next();
        });
    });
});
