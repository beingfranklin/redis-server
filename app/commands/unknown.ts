import type { Socket } from "node:net";
import { END_OF_STRING } from "../helpers/constants";

export const handleUnknownCommand = (connection: Socket, command: string) => {
	connection.write(`-ERR unknown command '${command}' ${END_OF_STRING}`);
};
