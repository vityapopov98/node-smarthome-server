// REST API
import { getConfig } from "../controllers/configControllers/config.js";
import {
  deleteDevices,
  getDevices,
  postDevices,
  putDevices,
} from "../controllers/configControllers/devices.js";
import { getHome, putHome } from "../controllers/configControllers/home.js";
import {
  deleteRooms,
  getRooms,
  postRooms,
  putRooms,
} from "../controllers/configControllers/rooms.js";
import {
  deleteUsers,
  getUsers,
  postUsers,
  putUsers,
} from "../controllers/configControllers/users.js";

import { sendVolgogradEnergoSbytCounter } from "../controllers/sendMail.js";
import { database } from "../index.js";
import { Buffer } from "buffer";

export default (app, aedes) => {
  // app.use(verifyAccessToken)

  app.get("", (req, res) => {
    //Обработчик. можно использоватеь MQTT aedes
    //aedes.publish  - отправляем с сервера на устройство
    //aedes.on('publish'){
    //     if(topick === 'топик /{id нужного утсройства}'){
    //     }
    // }
  });

  // ------------ Работа с Config -----------
  //------------------------------------------
  app.get("/config", getConfig);

  //Добавить пользователя в семейный доступ
  // то есть в объект users в конфиге
  app.get("/users", getUsers);
  app.post("/users", postUsers);
  app.put("/users", putUsers);
  app.delete("/users", deleteUsers);

  app.get("/rooms", getRooms);
  app.post("/rooms", postRooms);
  app.put("/rooms", putRooms);
  app.delete("/rooms", deleteRooms);

  //реализовать в первую очередь
  app.get("/devices", getDevices);
  app.post("/devices", postDevices);
  app.put("/devices", putDevices); //по логике не надо
  app.delete("/devices", deleteDevices);

  app.get("/home", getHome);
  app.put("/home", putHome);

  //API THERMOSTAT
  app.get("/sendVolgogradEnergoSbytCounterState", (req, res) => {
    //Обработчик. можно использоватеь MQTT aedes
    //aedes.publish  - отправляем с сервера на устройство
    const sendMQTTrequest = () => {
      return new Promise((resolve, reject) => {
        aedes.publish({
          cmd: "publish",
          qos: 2,
          topic: `${req.query.deviceId}/setState`,
          payload: Buffer.from("A:2;"),
          retain: false,
        });
        console.log("send to topic", `${req.query.deviceId}/setState`);
        aedes.on("publish", function (packet, client) {
          //Когда кто-то публикует данные в какой-то топик
          if (client) {
            console.log(`client publish ${packet.payload.toString()}`);
            console.log(packet);

            // Проверяем, что данные пришли от нужного устройства
            if (packet.topic === `${req.query.deviceId}/state`) {
              sendVolgogradEnergoSbytCounter(packet.payload.toString()).then(
                (resp) => {
                  console.log("mail response", resp);
                  resolve(packet);
                }
              );
            }

            //-------- по сути не нужно --------
            if (packet.payload.toString() != "") {
              //если поле данных не пустое
              console.log(packet.payload.toString());
            }
            //-------- конец не нужного ------
          }
        });
      });
    };

    sendMQTTrequest().then((packet) => {
      console.log("express packet", packet);
      res.send("OK");
    });
  });

  app.get("/db", (req, res) => {
    database.find({ eindex: "thermostat" }, (err, docs) => {
      if (err) {
        console.log(err);
        res.json({ status: "db error" });
      }
      res.json(docs);
    });
  });
};
