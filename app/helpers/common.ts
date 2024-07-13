export const startOfString = "+";
export const endOfString = "\r\n";
export const nullString = `$-1${endOfString}`;
export const bulkString = (response: string) =>
	`$${response.length}\r\n${response}${endOfString}`;
export const MASTER_REPLID = "8371b4fb1155b71f4a04d3e1bc3e18c4a990aeeb";
export const MASTER_REPL_OFFSET = 0;
