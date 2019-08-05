import express from "express";
import path from "path";

const app = express();

const rootDir = process.cwd();
const distDir = path.resolve(rootDir, "dist");
const prodPath = path.resolve(distDir, "index.html");
const devPath = path.resolve(__dirname, "dev.html");

app.get("/", (req, res) => res.sendFile(devPath));
app.get("/prod", (req, res) => res.sendFile(prodPath));

export default app;
