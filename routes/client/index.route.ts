import { Express } from "express";
import topicRoute from "./topic.route";
import homeRoute from "./home.route";
import songRoute from "./song.route";
import favoriteSonngRoute from "./favorite-song.route";
import searchRoute from "./search.route";
const routesClient = (app: Express) => {
    app.use("/topics",topicRoute);
    app.use("/", homeRoute);
    app.use("/songs", songRoute);
    app.use("/favorite-songs", favoriteSonngRoute);
    app.use("/search", searchRoute);
};
export default routesClient;