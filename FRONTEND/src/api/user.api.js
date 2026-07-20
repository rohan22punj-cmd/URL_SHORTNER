import axiosInstance from "../utils/axiosInstance";

export const registerUser = async(name, email, password) => {
    const { data } = await axiosInstance.post("/api/register", { name, email, password });
    return data;
}

export const loginUser = async(email, password) => {
    const { data } = await axiosInstance.post("/api/login", { email, password });
    return data;
}

export const logoutUser = async() => {
    const { data } = await axiosInstance.post("/api/logout");
    return data;
}

export const getCurrentUser = async() => {
    const { data } = await axiosInstance.get("/api/me");
    return data;
}
