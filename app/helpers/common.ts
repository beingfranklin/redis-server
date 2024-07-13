export const startOfString = "+";
export const endOfString = "\r\n";
export const nullString = `-$1${endOfString}`;
export const bulkString = (response: string) =>
	`$${response.length}\r\n${response}${endOfString}`;
