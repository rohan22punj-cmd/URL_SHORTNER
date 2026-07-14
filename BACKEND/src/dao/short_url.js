import urlSchema from "../models/shortUrlSchema.js";

export const saveShortUrl = async(full_url, short_url, userId) => {
    const newUrl = new urlSchema({
        full_url,
        short_url,

    });
    if (userId) {
        newUrl.user = userId;
    }
    await newUrl.save();
}
export const getShortUrl = async(short_url) => {
    const url = await urlSchema.findOneAndUpdate({ short_url }, { $inc: { visit_count: 1 } }, { new: true });
    return url;
};

// if we change our database like from mongodb to mysql 
// then we have to change this function only because 
// this function is responsible for saving the data in the database.