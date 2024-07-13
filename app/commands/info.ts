import type { Socket } from "node:net";
import {
	bulkString,
	endOfString,
	MASTER_REPL_OFFSET,
	MASTER_REPLID,
} from "../helpers/common";

export const handleInfo = (
	connection: Socket,
	dataString: string[],
	role: string,
) => {
	const section = dataString[4]?.toLowerCase();

	if (section === "replication") {
		const infoResponse = `role:${role}\nmaster_replid:${MASTER_REPLID}\nmaster_repl_offset:${MASTER_REPL_OFFSET}`;
		connection.write(bulkString(infoResponse));
	} else {
		connection.write(`$-1${endOfString}`);
	}
};
