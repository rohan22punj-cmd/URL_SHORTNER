import axiosInstance from "../utils/axiosInstance";

export const loginUser = async(email, password) => {
    const { data } = await axiosInstance.post("/api/login", { email, password });
    return data;
}