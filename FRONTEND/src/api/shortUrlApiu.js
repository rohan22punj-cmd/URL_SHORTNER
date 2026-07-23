import axiosInstance from "../utils/axiosInstance";

export const createShortUrl = async(fullUrl) => {
    const { data } = await axiosInstance.post("/api/create", { full_url: fullUrl });
    return data;
}

export const getShortUrlHistory = async() => {
    const { data } = await axiosInstance.get("/api/urls");
    return data.urls;
}