import express, { Request, Response } from "express";
import { ENV } from "./config/environment";
import router from "./router/router";
import cookieParser from "cookie-parser";
import connectDB from "./connection/connection";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./router/swagger.json";

const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

connectDB();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req: Request, res: Response) => {
    // res.cookie("jwt", "", {
    //     httpOnly: true,
    //     maxAge: 24*60*60*1000 // 1 hari
    // })
    return res.status(200).send("Hello World");
});

app.use("/api/v1", router);

app.listen(ENV.PORT, () =>
    console.log("Server is running at http://localhost:" + ENV.PORT)
);
