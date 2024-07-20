import type { ServerConfig } from "../types";
import { Role } from "./constants";

export const getPortAndRoleFromArgs = (args: string[]): ServerConfig => {
	const portIndex = args.indexOf("--port");
	const replicaOfIndex = args.indexOf("--replicaof");

	let port = 6379;
	let role: string = Role.MASTER;

	if (portIndex !== -1 && portIndex + 1 < args.length) {
		const parsedPort = Number.parseInt(args[portIndex + 1], 10);
		if (!Number.isNaN(parsedPort)) {
			port = parsedPort;
		}
	}

	if (replicaOfIndex !== -1 && replicaOfIndex + 2 < args.length) {
		role = Role.SLAVE;
	}

	return { port, role, replicaOfIndex };
};
