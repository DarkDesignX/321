const express = require("express");
const http = require("http");
var livereload = require("livereload");
var connectLiveReload = require("connect-livereload");
const { initializeWebsocketServer } = require("./server/websocketserver");
//needs fixing
const { initializeAPI } = require("./server/api/api.js");
const { initializeMariaDB, initializeDBSchema, executeSQL } = require("./server/database/database");

// Create the express server
const app = express();
const server = http.createServer(app);

// create a livereload server
const env = process.env.NODE_ENV || "development";
if (env !== "production") {
  const liveReloadServer = livereload.createServer();
  liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });
  // use livereload middleware
  app.use(connectLiveReload());
}

// deliver static files from the client folder like css, js, images
app.use(express.static("client"));
// route for the homepage
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/index.html");
});
  // Initialize the websocket server
  initializeWebsocketServer(server);
  // Initialize the REST api
  initializeAPI(app);
  
  // Allowing top-level await
  (async function () {
  // Initialize the database
  await initializeMariaDB();
  await initializeDBSchema();
  await executeSQL();
  
  //start the web server
  const serverPort = process.env.PORT || 3000;
  server.listen(serverPort, () => {
    console.log(
      `Express Server started on port ${serverPort} as '${env}' Environment`
    );
  });
})();
