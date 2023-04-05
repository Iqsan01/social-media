import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import middleware from "./middleware/middleware.js";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import uploadRoute from "./routes/upload.route.js";

const app = express();

//memanggil port dari .env
const port = process.env.PORT || 3000

//membatasi ukuran payload
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors())

app.use(cookieParser())

//panggil routernya
app.use("/auth", authRoute)
app.use("/users", userRoute)
app.use("/posts", postRoute)
app.use("/upload", uploadRoute)



//ErrorHandler Middleware
app.use(middleware.errorHandler)
app.use(middleware.notFound)
app.use(middleware.logger)

//setup connect ke mongodb
const connect = async () => {
    try {
        mongoose.connect(process.env.MONGO_URL, 
            { useNewUrlParser: true, useUnifiedTopology: true }
        )
        console.log("Connected on mongodb");
    } catch (err) {
        console.log(err);
    }
}

app.listen(port, () => {
    connect();
    console.log(`Server listening on ${port}`);
})
