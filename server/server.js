
import * as dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import mongoose from "mongoose";
import express from "express";
const app = express();
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path'
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import authRouter from "./routes/authRoute.js";
import uploadRouter from "./routes/uploadRoute.js";
import { authenticationUser } from "./middelware/authentication.js";
import errorHandlerMiddelware from "./middelware/errorHandlerMiddelware.js";
import notFound from "./middelware/notFound.js";


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});


const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, '../public')));

app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1", authenticationUser, uploadRouter);

app.get('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'../public','index.html'))
})

app.use(notFound);
app.use(errorHandlerMiddelware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, console.log(`server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
