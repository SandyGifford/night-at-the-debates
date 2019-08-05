import makeProdServer from "./makeProdServer";

makeProdServer(3000)
	.then(serverData => console.log(`App started.  Go to http://localhost:${serverData.port}`));
