import type { Socket } from "node:net";
import { endOfString } from "../helpers/common";

export const handleUnknownCommand = (connection: Socket, command: string) => {
	connection.write(`-ERR unknown command '${command}' ${endOfString}`);
};
