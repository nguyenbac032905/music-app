import { Express } from "express";
import topicRoute from "./topic.route";
import homeRoute from "./home.route";
import songRoute from "./song.route";
const routesClient = (app: Express) => {
    app.use("/topics",topicRoute);
    app.use("/", homeRoute);
    app.use("/songs", songRoute);
};
export default routesClient;