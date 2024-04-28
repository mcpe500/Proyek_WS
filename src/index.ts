import express, { Request, Response } from "express";
import { ENV } from "./config/environment";
import router from "./router/router";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import { ROUTES } from "./contracts/enum/RoutesRelated.enum";
import cors from "cors";
import swaggerDocument from "./router/swagger";
import { RESPONSE_STATUS } from "./contracts/enum/ResponseRelated.enum";
import connectMongoDB from "./connection/connection";
import sequelize from "./connection/connectionStatic";
import Paket from "./models/static/Paket.model";

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

connectMongoDB();

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
  return res.status(RESPONSE_STATUS.SUCCESS).send("Hello World");
});

app.listen(ENV.PORT, () =>
  console.log("Server is running at http://localhost:" + ENV.PORT)
);

export default app;
