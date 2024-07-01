import * as net from "net";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Create a server instance
const server: net.Server = net.createServer();

// Handle new client connections instead of using the connection event of the server 
// and individual connection events for each client
server.on("connection", (connection: net.Socket) => {
  console.log("New client connected");

  const keyValuePairs = new Map<string, string>();

  // Handle data received from the client
  connection.on("data", (data: Buffer) => {
    const startOfString = '+';
    const endOfString = '\r\n';
    const nullString = '-1'+endOfString;
    const dataString = data.toString().split(endOfString);
    const command = dataString[2].toLowerCase();
    console.log({command, dataString});
    
    // add switch case to handle different commands
    switch (command) {
      case "ping":
        connection.write(`${startOfString}PONG${endOfString}`);
        break;
      case "echo":
        const echoMessage = dataString[4];
        connection.write(`${startOfString}${echoMessage}${endOfString}`);
        break;
      case "set":
        // set expiry time for key-value pair
        if (dataString[5] === 'px'){
        const expiryTime = Number(dataString[8]);
        if (expiryTime && expiryTime - Date.now() < 0){
          connection.write(nullString);
          break;
        }
        }


        const key = dataString[4];
        const value = dataString[6];
        keyValuePairs.set(key, value);
        connection.write(`${startOfString}OK${endOfString}`);
        break;
      case "get":
        const keyToGet = dataString[4];
        const valueToGet = keyValuePairs.get(keyToGet);
        connection.write(`${startOfString}${valueToGet}${endOfString}`);
        break;
      default:
        const unknownCommand = dataString[2].trim();
        connection.write(`-ERR unknown command '${unknownCommand}' ${endOfString}`);
    }
  });

  // Handle client disconnection
  connection.on("end", () => {
    console.log("Client disconnected");
  });
});

// Start the server and listen for incoming connections
server.listen(6379, "127.0.0.1", () => {
  console.log("Server started and listening on port 6379");
});