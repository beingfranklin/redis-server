import type { Socket } from "node:net";
import { START_OF_STRING, END_OF_STRING, PONG } from "../helpers/constants";

export const handlePing = (connection: Socket) => {
	connection.write(`${START_OF_STRING}${PONG}${END_OF_STRING}`);
};
