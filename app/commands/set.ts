import type { Socket } from "node:net";
import { endOfString, startOfString } from "../helpers/common";

export const handleSet = (
	connection: Socket,
	keyValuePairs: Map<string, string>,
	expiryTimes: Map<string, number>,
	dataString: string[],
) => {
	const key = dataString[4];
	const value = dataString[6];
	const expiryTime = Number(dataString[10]);

	// check if the command has px and expiry time
	if (expiryTime && dataString[8] === "px") {
		expiryTimes.set(key, expiryTime + Date.now());
	}
	keyValuePairs.set(key, value);
	connection.write(`${startOfString}OK${endOfString}`);
};
