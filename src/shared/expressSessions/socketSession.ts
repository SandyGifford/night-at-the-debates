import expressSession from "express-session";
import expressSocketSession from "express-socket.io-session";

export const appSocketSession = expressSession({
	secret: "my-secret",
	resave: true,
	saveUninitialized: true
})

const socketSession = expressSocketSession(appSocketSession);

export default socketSession;
