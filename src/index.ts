import express from 'express';
import { ENV } from './config/environment';
import axios from 'axios';
import router from './router/router';
import cookieParser from 'cookie-parser';
import connectDB from './connection/connection';

const app = express();

connectDB()

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

app.listen(ENV.PORT, () => console.log("Server is running at http://localhost:" + ENV.PORT));