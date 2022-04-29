import dotenv from "dotenv";
import server from "./src/server";
import errorHandler from "./src/middlewares/errorHandler";
import routes from "./src/api/routes";
import dbInit from "./src/db/init";
import { isDev } from "./src/utils/misc";
import path from "path";

dotenv.config();

const port = parseInt(process.env.PORT || "5000");

console.log(`NODE_ENV=${process.env.NODE_ENV}`);

dbInit();

server.addErrorHandler(errorHandler);

server.addRoute("/api/v1", routes);

if (!isDev()) {
  console.log(`serve static directory : ${path.join(__dirname,'client')}`);
  server.static(path.join(__dirname,'client'));
}

server.start(port);
