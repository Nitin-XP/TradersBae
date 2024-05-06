import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import connectMongoDb from "./db/connectMongoDB.js";
import router from "./routes/auth.js";

dotenv.config();

const app = express();
app.use(express.json());  // parsing req.body -> json
app.use(express.urlencoded({ extended: true })); // Parses formdata

app.use(cookieParser()); // Parsing request to get cookies

app.use("/api/auth", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}.`);
    connectMongoDb();
})