const app = require("./app");
const http = require("http");
const debug = require("debug");
/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = (val) => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
const listen = () => {
  debug("Listening on port: " + port);
};

server.on("listening", listen);
server.listen(port);
