import express,{Express} from "express";
import dotenv from "dotenv";
import * as database from "./config/database";
import path from "path";
import * as systemConfig from "./config/system";
dotenv.config();
import routesClient from "./routes/client/index.route";
import routesAdmin from "./routes/admin/index.route";

database.connect();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({extended: true}));

app.locals.prefixAdmin = systemConfig.prefixAdmin;

routesClient(app);
routesAdmin(app);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})