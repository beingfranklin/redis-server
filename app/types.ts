export type ServerConfig = {
	port: number;
	role: string;
};

export const Command = {
	INFO: "info",
	GET: "get",
	ECHO: "echo",
	SET: "set",
	PING: "ping",
} as const;
