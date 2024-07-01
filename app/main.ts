import * as net from "net";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this block to pass the first stage
const server: net.Server = net.createServer((connection: net.Socket) => {
  // Handle connection
  console.log("data received");
  connection.on("data", (data: Buffer) => {
    console.log(data.toString());
	  connection.write(`+PONG\r\n`);
  });
  // Handle disconnection
  connection.on("end", () => {
    console.log("connection ended");
  });
});

server.listen(6379, "127.0.0.1");
