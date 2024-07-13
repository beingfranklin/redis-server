import * as net from "node:net";
import * as process from "node:process";
import { handlePing } from "./commands/ping";
import { handleEcho } from "./commands/echo";
import { endOfString } from "./helpers/common";
import { handleSet } from "./commands/set";
import { handleGet } from "./commands/get";
import { handleUnknownCommand } from "./commands/unknown";
import { handleInfo } from "./commands/info";
import { getPortAndRoleFromArgs } from "./helpers/get-port-from-args";
import type { ServerConfig } from "./types";

const server: net.Server = net.createServer();
const keyValuePairs = new Map<string, string>();
const expiryTimes = new Map<string, number>();
const config: ServerConfig = getPortAndRoleFromArgs(process.argv);

server.on("connection", (connection: net.Socket) => {
	console.log("New client connected");

	connection.on("data", (data: Buffer) => {
		const dataString = data.toString().split(endOfString);
		const command = dataString[2]?.toLowerCase();
		console.log({ command, dataString });

		switch (command) {
			case "ping":
				handlePing(connection);
				break;
			case "echo":
				handleEcho(connection, dataString);
				break;
			case "set":
				handleSet(connection, keyValuePairs, expiryTimes, dataString);
				break;
			case "get":
				handleGet(connection, keyValuePairs, expiryTimes, dataString);
				break;
			case "info":
				handleInfo(connection, dataString, config.role);
				break;
			default:
				handleUnknownCommand(connection, command);
		}
	});

	connection.on("end", () => {
		console.log("Client disconnected");
	});
});

console.log("Process arguments:", process.argv);
console.log(`Parsed port: ${config.port}, role: ${config.role}`);
server.listen(config.port, "127.0.0.1", () => {
	console.log(`Server started and listening on port ${config.port}`);
});
