import mongoose from "mongoose"


const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            require: true
        }, password: {
            type: String,
            require: true
        }
    }
)

const userModel = new mongoose.model("userss", userSchema, "userss")
export default userModel