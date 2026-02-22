import { Express} from "express";
import routesTopic from "./topic.route";
import * as systemConfig from "../../config/system";
import routesSinger from "./singer.route";
const routesAdmin = (app: Express) => {
    app.use(systemConfig.prefixAdmin + "/topics",routesTopic);
    app.use(systemConfig.prefixAdmin + "/singers",routesSinger)
}
export default routesAdmin;