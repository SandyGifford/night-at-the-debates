import express from "express";
import path from "path";

const app = express();

const rootDir = process.cwd();
const distDir = path.resolve(rootDir, "dist");
const htmlPath = path.resolve(distDir, "index.html");

app.get("/", (req, res, next) => {
	// TODO: not really a fan of this, would like to do this from the dev routing file
	if (process.env.NODE_ENV) next();
	else res.sendFile(htmlPath)
});
app.get(/^\/(assets|build)\/.*/, (req, res) => res.sendFile(path.join(distDir, req.url)));

export default app;
