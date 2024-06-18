import app from "./src/";
import { ENV } from "./src/config/environment";

app.listen(ENV.PORT, () =>
  console.log("Server is running at http://localhost:" + ENV.PORT)
);
