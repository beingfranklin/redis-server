import type { Socket } from "node:net";
import { endOfString, startOfString } from "../helpers/common";

export const handleEcho = (connection: Socket, dataString: string[]) => {
	const echoMessage = dataString[4];
	connection.write(`${startOfString}${echoMessage}${endOfString}`);
};
