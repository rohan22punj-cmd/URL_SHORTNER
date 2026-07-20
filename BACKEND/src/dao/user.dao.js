import User from "../models/userModel.js";

export const findUserByEmail = (email) => {
    return User.findOne({ email });
}

export const createUser = async(userData) => {
    return await User.create(userData);
}
export const findUserById = (id) => {
    return User.findById(id);
}
