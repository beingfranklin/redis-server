import type { Socket } from "node:net";
import { END_OF_STRING, OK, PX, START_OF_STRING } from "../helpers/constants";

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
	if (expiryTime && dataString[8] === PX) {
		expiryTimes.set(key, expiryTime + Date.now());
	}
	keyValuePairs.set(key, value);
	connection.write(`${START_OF_STRING}${OK}${END_OF_STRING}`);
};
