import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectMongoDb from "./db/connectMongoDB.js";
import authRouter from "./routes/auth.js";
import notificationRouter from "./routes/notification.js";
import postRouter from "./routes/post.js";
import userRouter from "./routes/user.js";

dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const app = express();
const corsOpts = {
    origin: ["http://localhost:5000", "http://localhost:8000"],
    credentials: true,
    exposedHeaders: ["set-cookie"],
}
app.use(cors(corsOpts))

app.use(express.json());  // parsing req.body -> json
app.use(express.urlencoded({ extended: true })); // Parses formdata

app.use(cookieParser()); // Parsing request to get cookies

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/notifications", notificationRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}.`);
    connectMongoDb();
})