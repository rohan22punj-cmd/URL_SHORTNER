import { findUserByEmail, createUser } from "../dao/user.dao.js";
import { BadRequestError } from "../utils/errorHandler.js";
import { comparePassword, hashPassword, signToken } from "../utils/helper.js";

export const sanitizeUser = (user) => {
    if (!user) return null;

    const userObject = user.toObject ? user.toObject() : user;
    delete userObject.password;
    return userObject;
};

export const registerUserService = async({ name, username, email, password }) => {
    const displayName = name || username;

    if (!displayName || !email || !password) {
        throw new BadRequestError("Name, email, and password are required.");
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await findUserByEmail(normalizedEmail);

    if (existingUser) {
        throw new BadRequestError("A user with this email already exists.");
    }

    const hashedPassword = await hashPassword(password);
    const user = await createUser({
        name: displayName.trim(),
        email: normalizedEmail,
        password: hashedPassword,
    });
    const token = signToken({ id: user._id });

    return { user, token };
};

export const loginUserService = async({ email, password }) => {
    if (!email || !password) {
        throw new BadRequestError("Email and password are required.");
    }

    const user = await findUserByEmail(email.trim().toLowerCase()).select("+password");

    if (!user) {
        throw new BadRequestError("Invalid credentials.");
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
        throw new BadRequestError("Invalid credentials.");
    }

    const token = signToken({ id: user._id });

    return { user, token };
};
