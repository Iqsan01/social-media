import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    roles: {
        type: String,
        enum: ['User', 'Admin'],
        default: 'User'
    },
    refreshTokens: [String],
    profilePicture: String,
    coverPicture: String,
    about: String,
    livesin: String,
    workAt: String,
    relationship: String,
    followers: [],
    following: [],
},
    { timestamps: true }
)

export default mongoose.model("Users", userSchema)