import { Server } from "http";
import socket from "socket.io";

export default class ServerComm {
	private io: socket.Server;
	constructor(server: Server) {
		this.io = socket(server);
		this.io.on("connect", this.userConnected);
	}

	public sendFail = () => {
		this.io.emit("buildFail", "lastFail");
	};

	private userConnected = (socket: socket.Socket) => {
		console.log("a user connected");

		socket.on("disconnect", this.userDisconnected);
	};

	private userDisconnected = () => {
		console.log("a user disconnected");
	};
}
