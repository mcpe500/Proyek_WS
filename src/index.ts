import express, { Request, Response } from "express";
import { ENV } from "./config/environment";
import router from "./router/router";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import { ROUTES } from "./contracts/enum/RoutesRelated.enum";
import cors from "cors";
import swaggerDocument from "./documentation/swagger";
import { RESPONSE_STATUS } from "./contracts/enum/ResponseRelated.enum";
import connectMongoDB from "./connection/connection";
import sequelize from "./connection/connectionStatic";
import Paket from "./models/static/Paket.model";
import path from "path";

const app = express();

// const swaggerUiAssetPath = require("swagger-ui-dist").getAbsoluteFSPath();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use("/swagger-ui", express.static(swaggerUiAssetPath));

connectMongoDB();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(ROUTES.API_V1, router);

app.get(ROUTES.ROOT, (req: Request, res: Response) => {
  return res
    .status(RESPONSE_STATUS.SUCCESS)
    .send("This API Service is currently running");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//return a render ejs
app.get("/location", async (req: Request, res: Response) => {
  try {
    // You can pass data to your EJS file if needed
    const data = {
      backend_url: `${ENV.BACKEND_API_URL}:${ENV.PORT}`,
      // other data...
    };

    // Render the 'location' EJS view file (assuming it exists in your views directory)

    res.render(path.join(__dirname, "templates", "get_location.ejs"), data);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});

export default app;
