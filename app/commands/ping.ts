import type { Socket } from "node:net";
import { endOfString, startOfString } from "../helpers/common";

export const handlePing = (connection: Socket) => {
	connection.write(`${startOfString}PONG${endOfString}`);
};
