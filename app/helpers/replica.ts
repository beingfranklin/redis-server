import * as net from "node:net";
import { Command, END_OF_STRING } from "./constants";

export const handleReplicaConnection = (
	masterHost: string,
	masterPort: string,
) => {
	const masterConnection = net.createConnection(
		{ host: masterHost, port: Number.parseInt(masterPort) },
		() => {
			console.log("Connected to master");
			masterConnection.write(`${Command.PING}${END_OF_STRING}`);
		},
	);

	masterConnection.on("data", (data: Buffer) => {
		const dataString = data.toString().split(END_OF_STRING);
		console.log("Received from master:", dataString);
	});

	masterConnection.on("end", () => {
		console.log("Disconnected from master");
	});
};
