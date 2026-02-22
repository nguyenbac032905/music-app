import express,{Express} from "express";
import dotenv from "dotenv";
import routesClient from "./routes/client/index.route";
import * as database from "./config/database";
import path from "path";

dotenv.config();

database.connect();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

routesClient(app);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})