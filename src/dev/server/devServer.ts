console.clear();

// console.log("[0m[31;1m[tsl]");
// console.log("[0m[31m[tsl]");

import addWebpack from "./addWebpack";
import makeProdServer from "../../prod/server/makeProdServer";
import fs from "fs-extra";
import path from "path";
import routing from "./routing";

makeProdServer()
	.then(serverData => {
		fs.emptyDir(path.resolve(process.cwd(), "dist", "build"));
		serverData.app.use(routing);

		addWebpack(serverData.server, () => {
			console.log(`App ready.  Listening at http://localhost:${serverData.port}`);
		});
	});
