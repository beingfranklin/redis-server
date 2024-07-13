import type { Socket } from "node:net";
import { END_OF_STRING, NULL_STRING, bulkString } from "../helpers/constants";

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
		connection.write(NULL_STRING);
		return;
	}

	const valueToGet = keyValuePairs.get(keyToGet);
	if (valueToGet === undefined) {
		connection.write(NULL_STRING);
	} else {
		connection.write(bulkString(valueToGet));
	}
};
