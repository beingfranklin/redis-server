import * as net from "node:net";
import * as process from "node:process";
import { handlePing } from "./commands/ping";
import { handleEcho } from "./commands/echo";
import { handleSet } from "./commands/set";
import { handleGet } from "./commands/get";
import { handleUnknownCommand } from "./commands/unknown";
import { handleInfo } from "./commands/info";
import { Command, END_OF_STRING, Role } from "./helpers/constants";
import { getPortAndRoleFromArgs } from "./helpers/get-port-from-args";
import { handleReplicaConnection } from "./helpers/replica";
import type { ServerConfig } from "./types";

const server: net.Server = net.createServer();
const keyValuePairs = new Map<string, string>();
const expiryTimes = new Map<string, number>();
const config: ServerConfig = getPortAndRoleFromArgs(process.argv);

if (config.role === Role.SLAVE) {
	const [masterHost, masterPort] = process.argv.slice(
		config.replicaOfIndex + 1,
		config.replicaOfIndex + 3,
	);
	handleReplicaConnection(masterHost, masterPort);
}

server.on("connection", (connection: net.Socket) => {
	console.log("New client connected");

	connection.on("data", (data: Buffer) => {
		const dataString = data.toString().split(END_OF_STRING);
		const command = dataString[2]?.toLowerCase();
		console.log({ command, dataString });

		switch (command) {
			case Command.PING:
				handlePing(connection);
				break;
			case Command.ECHO:
				handleEcho(connection, dataString);
				break;
			case Command.SET:
				handleSet(connection, keyValuePairs, expiryTimes, dataString);
				break;
			case Command.GET:
				handleGet(connection, keyValuePairs, expiryTimes, dataString);
				break;
			case Command.INFO:
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
