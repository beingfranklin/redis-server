import * as net from "net";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Create a server instance
const server: net.Server = net.createServer();

// Handle new client connections instead of using the connection event of the server 
// and individual connection events for each client
server.on("connection", (connection: net.Socket) => {
  console.log("New client connected");

  // Handle data received from the client
  connection.on("data", (data: Buffer) => {
    const dataString = data.toString().split(`\r\n`);
    const command = dataString[2].toLowerCase();
    console.log(command);
    // add switch case to handle different commands
    switch (command) {
      case "ping":
        connection.write(`+PONG\r\n`);
        break;
      case "echo":
        connection.write(`${dataString[4]}\r\n`);
        break;
      default:
        connection.write(`-ERR unknown command '${dataString[2].trim()}'\r\n`);
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