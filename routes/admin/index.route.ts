import { Express} from "express";
import routesTopic from "./topic.route";
import * as systemConfig from "../../config/system";
const routesAdmin = (app: Express) => {
    app.use(systemConfig.prefixAdmin + "/topics",routesTopic);
}
export default routesAdmin;