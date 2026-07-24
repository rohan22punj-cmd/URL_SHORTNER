import mongoose from 'mongoose';

const connectDB = async() => {
    try {
        // Prioritize Atlas Cloud URL over localhost fallback
        let dbUrl = process.env.MONGO_URL;
        if (!dbUrl || dbUrl.includes("127.0.0.1") || dbUrl.includes("localhost")) {
            dbUrl = process.env.MONGO_URI || dbUrl;
        }

        const conn = await mongoose.connect(dbUrl, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};
export default connectDB;
