import express, { Request, Response } from "express";
import { ENV } from "./config/environment";
import router from "./router/router";
import cookieParser from "cookie-parser";
import connectDB from "./connection/connection";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./router/swagger.json";
import { ROUTES } from "./contracts/enum/RoutesRelated.enum";
import cors from 'cors';

const app = express();
const paths: any = {};
paths[ROUTES.ROOT] = {
    get: {
        summary: "Root endpoint",
        description: "Returns a Hello World message",
        responses: {
            "200": {
                description: "Successful operation",
                content: {
                    "text/plain": {
                        schema: {
                            type: "string",
                            example: "Hello World",
                        },
                    },
                },
            },
        },
    },
};

const swaggerOptions = {
    openapi: "3.0.0",
    info: {
        title: "Your API Title",
        description: "",
        version: "1.0.0",
    },
    paths: paths,
};

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

connectDB();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(ROUTES.API_V1, router);

app.get(ROUTES.ROOT, (req: Request, res: Response) => {
    // res.cookie("jwt", "", {
    //     httpOnly: true,
    //     maxAge: 24*60*60*1000 // 1 hari
    // })
    return res.status(200).send("Hello World");
});

app.listen(ENV.PORT, () =>
    console.log("Server is running at http://localhost:" + ENV.PORT)
);
