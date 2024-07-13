// Function to get the port from the arguments
export const getPortFromArgs = (args: string[]): number => {
	const portIndex = args.indexOf("--port");
	if (portIndex !== -1 && portIndex + 1 < args.length) {
		const port = parseInt(args[portIndex + 1], 10);
		if (!isNaN(port)) {
			return port;
		}
	}
	return 6379;
};
