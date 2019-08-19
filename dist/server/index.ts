console.clear();

import http from "http";
import app from "./server";

const PORT = 3000;
const server = http.createServer(app);

server.listen(PORT, () => {
	console.log(`App ready.  Listening on port ${PORT}`);
});
