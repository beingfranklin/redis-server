export const START_OF_STRING = "+";
export const END_OF_STRING = "\r\n";
export const NULL_STRING = `$-1${END_OF_STRING}`;
export const ROLE = "role";
export const MASTER_REPLID = "8371b4fb1155b71f4a04d3e1bc3e18c4a990aeeb";
export const MASTER_REPL_OFFSET = 0;
export const MASTER_REPLID_KEY = "master_replid";
export const MASTER_REPL_OFFSET_KEY = "master_repl_offset";
export const PONG = "PONG";
export const OK = "OK";
export const PX = "px";

export const Command = {
	INFO: "info",
	GET: "get",
	ECHO: "echo",
	SET: "set",
	PING: "ping",
} as const;

export const Role = {
	MASTER: "master",
	SLAVE: "slave",
} as const;

export const bulkString = (response: string) =>
	`$${response.length}${END_OF_STRING}${response}${END_OF_STRING}`;
