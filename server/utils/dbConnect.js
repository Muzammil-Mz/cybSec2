import mongoose from "mongoose"
import config from "config"

const dbUri = config.get("dbUri")

let dbConnect = async () => {

    try {
        await mongoose.connect(dbUri)
        console.log("db connected successfully");
    } catch (error) {
        console.log(error);
    }
}


dbConnect()