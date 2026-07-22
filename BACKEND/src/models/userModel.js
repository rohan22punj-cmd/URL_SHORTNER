import mongoose from "mongoose";
import crypto from "crypto";

const getGravatarUrl = (email) => {
    const hash = crypto
        .createHash("md5")
        .update(email.trim().toLowerCase())
        .digest("hex");

    return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
};

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    avatar: {
        type: String,
        default: function() {
            return getGravatarUrl(this.email);
        },
    },
});

const User = mongoose.model("User", userSchema);

export default User;
