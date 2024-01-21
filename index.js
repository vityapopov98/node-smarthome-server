import express from "express";
const app = express();
import bodyParser from "body-parser";
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

import aedesI from "aedes";
const aedes = aedesI();

import serverI from "net";
const server = serverI.createServer(aedes.handle);

import httpServerI from "http";
const httpServer = httpServerI.createServer();

import ws from "websocket-stream";

const port = 1883;
const wsPort = 8888;

// //----------- Run Express server --------------
// //----------------------------------------------------
const PORT = 4000;
app.listen(PORT, () => {
  console.log("express on 4000");
});

app.use(express.static("client/dist"));
app.use(express.static("/configs"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
  // res.send('hello my dear')
});

//----------MQTT------------
import aedesEventHandler from "./mqttControllers/aedesEventHandler.js";
import routes from "./routes/index.js";
const ApiRouter = routes(app, aedes);

server.listen(port, function () {
  console.log("server listening on port", port);
});

ws.createServer(
  {
    server: httpServer,
  },
  aedes.handle
); //запуск брокера

// ---------MQTT Client (Bridge To Inet)--------
import mqtt from "mqtt";
const client = mqtt.connect({
  host: process.env.WQTT_HOST,
  port: process.env.WQTT_PORT,
  username: process.env.WQTT_USERNAME,
  password: process.env.WQTT_PASSWORD,
});

//--------NeDB---------
import Datastore from "nedb";
export const database = new Datastore("database.db");
database.loadDatabase();

httpServer.listen(wsPort, "0.0.0.0", function () {
  console.log("websocket server listening on port", wsPort);
});

aedesEventHandler(aedes, client);
