import type { Socket } from "node:net";
import { bulkString, endOfString } from "../helpers/common";

export const handleInfo = (connection: Socket, dataString: string[]) => {
	const section = dataString[4]?.toLowerCase();

	if (section === "replication") {
		const infoResponse = "role:master";
		connection.write(bulkString(infoResponse));
	} else {
		connection.write(`$-1${endOfString}`);
	}
};
