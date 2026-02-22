import { Express } from "express";
import topicRoute from "./topic.route";
const routesClient = (app: Express) => {
    app.use("/topics",topicRoute);
};
export default routesClient;