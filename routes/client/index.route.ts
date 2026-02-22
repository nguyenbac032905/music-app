import { Express } from "express";
import topicRoute from "./topic.route";
import homeRoute from "./home.route";
const routesClient = (app: Express) => {
    app.use("/topics",topicRoute);
    app.use("/", homeRoute);
};
export default routesClient;