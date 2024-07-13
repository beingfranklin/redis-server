import type { Socket } from "node:net";
import { bulkString, endOfString } from "../helpers/common";

export const handleInfo = (
	connection: Socket,
	dataString: string[],
	role: string,
) => {
	const section = dataString[4]?.toLowerCase();

	if (section === "replication") {
		const infoResponse = `role:${role}`;
		connection.write(bulkString(infoResponse));
	} else {
		connection.write(`$-1${endOfString}`);
	}
};
