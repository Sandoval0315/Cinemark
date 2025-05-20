import app from "./app.js";
import "./database.js";
import { config } from "./src/config.js";
import 'dotenv/config';


async function main() {
  app.listen(config.server.port);
  console.log("Server on port " + config.server.port);
}
main();
