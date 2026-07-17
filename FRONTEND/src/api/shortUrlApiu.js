import Axios from "axios";

export const createShortUrl = async(fullUrl) => {
    const { data } = await axiosInstance.post("/api/create", { full_url: fullUrl });
    return data;
}