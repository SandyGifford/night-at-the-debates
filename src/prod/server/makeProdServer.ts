import express from "express";
import http from "http";
import getPort from "./getPort";
import routing from "./routing";
import { Server } from "http";

export interface ServerData {
	app: express.Express;
	port: number;
	server: Server;
}

const makeProdServer = (forcePort?: number): Promise<ServerData> => {
	return (typeof forcePort === "number" ? Promise.resolve(forcePort) : getPort(3000))
		.then(port => {
			return new Promise(res => {
				const app = express();
				app.use(routing);

				const server = http.createServer(app);
				server.listen(port, () => res({
					app,
					port,
					server
				}));
			});
		})
};

export default makeProdServer;
