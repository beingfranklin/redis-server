import type { Socket } from "node:net";
import { START_OF_STRING, END_OF_STRING } from "../helpers/constants";

export const handleEcho = (connection: Socket, dataString: string[]) => {
	const echoMessage = dataString[4];
	connection.write(`${START_OF_STRING}${echoMessage}${END_OF_STRING}`);
};
