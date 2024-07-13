import type { Socket } from "node:net";
import { endOfString, nullString, startOfString } from "../helpers/common";

export const handleGet = (
	connection: Socket,
	keyValuePairs: Map<string, string>,
	expiryTimes: Map<string, number>,
	dataString: string[],
) => {
	const keyToGet = dataString[4];
	const expiryTime = expiryTimes.get(keyToGet);

	if (expiryTime && expiryTime < Date.now()) {
		keyValuePairs.delete(keyToGet);
		expiryTimes.delete(keyToGet);
		connection.write(nullString);
		return;
	}

	const valueToGet = keyValuePairs.get(keyToGet);
	if (valueToGet === undefined) {
		connection.write(nullString);
	} else {
		connection.write(`${startOfString}${valueToGet}${endOfString}`);
	}
};
