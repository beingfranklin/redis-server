import * as net from "net";
import * as process from "process";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Create a server instance
const server: net.Server = net.createServer();

const keyValuePairs = new Map<string, string>();
const expiryTimes = new Map<string, number>();

const startOfString = '+';
const endOfString = '\r\n';
const nullString = '$-1' + endOfString;

const handlePing = (connection: net.Socket) => {
  connection.write(`${startOfString}PONG${endOfString}`);
};

const handleEcho = (connection: net.Socket, dataString: string[]) => {
  const echoMessage = dataString[4];
  connection.write(`${startOfString}${echoMessage}${endOfString}`);
};

const handleSet = (connection: net.Socket, dataString: string[]) => {
  const key = dataString[4];
  const value = dataString[6];
  const expiryTime = Number(dataString[10]);

  // check if the command has px and expiry time
  if (expiryTime && dataString[8] === 'px') {
    expiryTimes.set(key, expiryTime + Date.now());
  }
  keyValuePairs.set(key, value);
  connection.write(`${startOfString}OK${endOfString}`);
};

const handleGet = (connection: net.Socket, dataString: string[]) => {
  const keyToGet = dataString[4];
  const expiryTime = expiryTimes.get(keyToGet);

  if (expiryTime && (expiryTime < Date.now())) {
    keyValuePairs.delete(keyToGet);
    expiryTimes.delete(keyToGet);
    connection.write(nullString);
    return;
  }

  const valueToGet = keyValuePairs.get(keyToGet);
  if (valueToGet === undefined) {
    connection.write(nullString);
  } else {
    connection.write(`${startOfString}${valueToGet}${endOfString}`);
  }
};

const handleUnknownCommand = (connection: net.Socket, command: string) => {
  connection.write(`-ERR unknown command '${command}' ${endOfString}`);
};

// Handle new client connections
server.on("connection", (connection: net.Socket) => {
  console.log("New client connected");

  // Handle data received from the client
  connection.on("data", (data: Buffer) => {
    const dataString = data.toString().split(endOfString);
    const command = dataString[2].toLowerCase();
    console.log({ command, dataString });

    // add switch case to handle different commands
    switch (command) {
      case "ping":
        handlePing(connection);
        break;
      case "echo":
        handleEcho(connection, dataString);
        break;
      case "set":
        handleSet(connection, dataString);
        break;
      case "get":
        handleGet(connection, dataString);
        break;
      default:
        handleUnknownCommand(connection, command);
    }
  });

  // Handle client disconnection
  connection.on("end", () => {
    console.log("Client disconnected");
  });
});

// Start the server and listen for incoming connections
const PORT = parseInt(process.argv[4], 10) || 6379;
server.listen(PORT, "127.0.0.1", () => {
  console.log(`Server started and listening on port ${PORT}`);
});
