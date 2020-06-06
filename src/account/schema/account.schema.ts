import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const AccountSchema = new mongoose.Schema({
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

AccountSchema.pre<any>('save', function (next) {
    let user = this;
    user.userType === "INVESTOR" ? user.roles = ["INVESTOR"] : null
    user.userType === "MINISTRY" ? user.roles = ["MINISTRY"] : null
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});
