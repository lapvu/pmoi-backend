"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountSchema = void 0;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
exports.AccountSchema = new mongoose.Schema({
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
    displayName: {
        type: String,
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
    userType: {
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
exports.AccountSchema.pre('save', function (next) {
    let user = this;
    user.userType === "INVESTOR" ? user.roles = ["INVESTOR"] : null;
    user.userType === "MINISTRY" ? user.roles = ["MINISTRY"] : null;
    if (!user.isModified('password'))
        return next();
    bcrypt.genSalt(10, (err, salt) => {
        if (err)
            return next(err);
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err)
                return next(err);
            user.password = hash;
            next();
        });
    });
});
//# sourceMappingURL=account.schema.js.map