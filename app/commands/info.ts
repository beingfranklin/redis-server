import type { Socket } from "node:net";
import {
	bulkString,
	END_OF_STRING,
	ROLE,
	MASTER_REPLID,
	MASTER_REPL_OFFSET,
	MASTER_REPLID_KEY,
	MASTER_REPL_OFFSET_KEY,
} from "../helpers/constants";

export const handleInfo = (
	connection: Socket,
	dataString: string[],
	role: string,
) => {
	const section = dataString[4]?.toLowerCase();

	if (section === "replication") {
		const infoResponse = `${ROLE}:${role}\n${MASTER_REPLID_KEY}:${MASTER_REPLID}\n${MASTER_REPL_OFFSET_KEY}:${MASTER_REPL_OFFSET}`;
		connection.write(bulkString(infoResponse));
	} else {
		connection.write(`$-1${END_OF_STRING}`);
	}
};
