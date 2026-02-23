import { Express} from "express";
import routesTopic from "./topic.route";
import * as systemConfig from "../../config/system";
import routesSinger from "./singer.route";
import routesDashboard from "./dashboard.route";
import routesSong from "./song.route";
const routesAdmin = (app: Express) => {
    app.use(systemConfig.prefixAdmin + "/topics",routesTopic);
    app.use(systemConfig.prefixAdmin + "/singers",routesSinger);
    app.use(systemConfig.prefixAdmin + "/dashboard",routesDashboard);
    app.use(systemConfig.prefixAdmin + "/songs",routesSong);
}
export default routesAdmin;