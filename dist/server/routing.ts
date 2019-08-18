import express from "express";
import path from "path";

const app = express();

const rootDir = process.cwd();
const distDir = path.resolve(rootDir, "dist");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get("/", (req, res) => res.render("index"));
app.get(/^\/(assets|build)\/.*/, (req, res) => res.sendFile(path.join(distDir, req.url)));

export default app;
