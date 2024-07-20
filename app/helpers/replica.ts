import * as net from "node:net";
import { Command, END_OF_STRING } from "./constants";

const MAX_RETRIES = 5;
const RETRY_DELAY = 1000; // in milliseconds

export const handleReplicaConnection = (
	masterHost: string,
	masterPort: string,
	retryCount = 0,
) => {
	console.log(
		`Attempting to connect to master at ${masterHost}:${masterPort} (Attempt ${retryCount + 1})`,
	);

	const masterConnection = net.createConnection(
		{ host: masterHost, port: Number.parseInt(masterPort, 10) },
		() => {
			console.log("Connected to master");
			masterConnection.write(`${Command.PING}${END_OF_STRING}`);
			console.log("Sent PING to master");
		},
	);

	masterConnection.on("data", (data: Buffer) => {
		const dataString = data.toString().split(END_OF_STRING);
		console.log("Received from master:", dataString);
		// Handle response from master if needed
	});

	masterConnection.on("end", () => {
		console.log("Disconnected from master");
	});

	masterConnection.on("error", (err) => {
		console.error("Error connecting to master:", err.message);
		if (retryCount < MAX_RETRIES) {
			setTimeout(() => {
				handleReplicaConnection(masterHost, masterPort, retryCount + 1);
			}, RETRY_DELAY);
		} else {
			console.error("Max retries reached. Could not connect to master.");
		}
	});
};
