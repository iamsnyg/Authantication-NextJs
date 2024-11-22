import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    name: {
        type: String,
        required: true,

    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
    },
    isVarified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgetPasswordGenerateToken: {
        type: String,
    },
    forgetPasswordGenerateExpire: {
        type: Date,
    },
    verifyUserToken: {
        type: String,
    },
    verifyUserExpire: {
        type: Date,
    },
}, { timestamps: true });

const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;
