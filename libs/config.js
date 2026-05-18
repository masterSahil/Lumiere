import mongoose from "mongoose";
// const dns = require("node:dns/promises");
// dns.setServers(["1.1.1.1"])

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;