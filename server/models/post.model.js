import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema ({
    userId: {
        type: String,
        required: true
    },
    desc: String,
    likes: [],
    image: String,
},
{timestamps: true}
)

export default mongoose.model("Posts", postSchema)