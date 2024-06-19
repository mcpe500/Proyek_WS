import app from ".";
import { ENV } from "./config/environment";

app.listen(ENV.PORT, () =>
  console.log("Server is running at http://localhost:" + ENV.PORT)
);
  