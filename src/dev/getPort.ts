import net from "net";

const getPort = (desiredPort: number, maxPort = desiredPort + 100): Promise<number> => {
	return new Promise((res, rej) => {
		if (desiredPort > maxPort) rej("no ports available");

		const server = net.createServer();

		server.listen(desiredPort, () => {
			server.once("close", () => {
				res(desiredPort);
			});
			server.close();
		});
		server.on("error", () => {
			res(getPort(desiredPort + 1, maxPort));
		});
	});
}

export default getPort;
