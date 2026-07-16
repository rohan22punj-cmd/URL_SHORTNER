export const createShortUrl = async(fullUrl) => {
    const { data } = await Axios.post("/api/create", { full_url: fullUrl });
}