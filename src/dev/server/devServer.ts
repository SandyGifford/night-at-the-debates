console.clear();

import addWebpack from "./addWebpack";
import fs from "fs-extra";
import path from "path";
import express from "express";
import routing from "./routing";
import http from "http";
import getPort from "../getPort";
import prodApp from "../../../dist/server/server";

fs.emptyDir(path.resolve(process.cwd(), "dist", "build"));

getPort(3000)
	.then(devPort => {
		const devApp = express();
		devApp.use(routing);

		fs.emptyDir(path.resolve(process.cwd(), "dist", "build"));
		devApp.use(routing);

		const devServer = http.createServer(devApp);

		devServer.listen(devPort, () => {
			addWebpack(devServer, () => {
				console.log(`Dev ready.  Listening at http://localhost:${devPort}`);
			});
		});

		getPort(3000)
			.then(appPort => {
				const prodServer = http.createServer(prodApp);

				prodServer.listen(appPort, () => {
					console.log(`App ready on port ${appPort}`);
				});
			});
	});