import { initRoomsObserver, observeRoomsState } from "./roomsMqttClients.js";
import { saveDevicesData, saveToElastic } from "./saveDevicesData.js";
import { sendConnectedDevicesToHub } from "../devices/hub.js";

export default (aedes, client) => {
  console.log("Aedes is working");
  initRoomsObserver();

  client.on("connect", () => {
    client.subscribe("#", (err) => {
      if (!err) {
        client.publish("/wq", "hello from local server");
        console.log("server published to inet");
      } else {
        console.log("server dont published to inet");
      }
    });
  });

  client.on("message", (topic, message) => {
    console.log("message from Wqtt", topic, message.toString());
    //client.publish("THS16001/setState", "hello from local server");
    aedes.publish({
      cmd: "publish",
      qos: 2,
      topic: topic,
      payload: Buffer.from(message.toString()),
      retain: false,
    });
  });

  aedes.on("clientError", function (client, err) {
    console.log("client error", client.id, err.message, err.stack);
  });

  aedes.on("connectionError", function (client, err) {
    console.log("client error", client, err.message, err.stack);
  });

  aedes.on("publish", function (packet, client) {
    //Когда кто-то публикует данные в какой-то топик
    if (client) {
      console.log(packet);

      observeRoomsState(packet.topic, packet.payload.toString());
      saveDevicesData(packet.topic, packet.payload.toString());
      const e = saveToElastic(packet.topic, {
        data: packet.payload.toString(),
      });
      console.log("возможная ошибка:", e);
      //-------- по сути не нужно --------
      if (packet.payload.toString() != "") {
        //если поле данных не пустое
        console.log(
          packet.topic,
          packet.payload.toString(),
          packet.payload,
          packet.payload.length
        );

        // const arrb = toArrayBuffer(packet.payload);
        // console.log(packet.payload.slice(0, 2));
        // console.log(packet.payload.slice(0, 4));
        try {
          if (packet.payload.length === 17) {
            console.log(packet.payload.slice(0, 4).readFloatLE(0));
            console.log(packet.payload.slice(4, 8).readFloatLE(0));
            console.log(packet.payload.slice(8, 10).readUInt16LE(0));
            console.log(packet.payload.slice(10, 12).readUInt16LE(0));
            console.log(packet.payload.slice(12, 13).readUInt8(0));
            console.log(packet.payload.slice(13, 14).readUInt8(0));
            console.log(packet.payload.slice(14, 15).readUInt8(0));
            console.log(packet.payload.slice(15, 16).readUInt8(0));
            console.log(packet.payload.slice(16, 17).readUInt8(0));
          }
        } catch (error) {
          console.log(error);
        }
      }
      //-------- конец не нужного ------
    }
  });

  aedes.on("subscribe", function (subscriptions, client) {
    //когда кто-то подписывается на какой-то топик
    if (client) {
      console.log("subscribe from client", subscriptions, client.id);
      const diveceId = subscriptions[0].topic.substring(0, 8);
      if (diveceId.substring(0, 3) === "ULN") {
        sendConnectedDevicesToHub(diveceId, aedes);
      }
    }
  });

  aedes.on("client", function (client) {
    //когда к брокеру подключается новый клиент
    console.log("new client", client.id);
  });
};

function toArrayBuffer(buffer) {
  var ab = new ArrayBuffer(buffer.length);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buffer.length; ++i) {
    view[i] = buffer[i];
  }
  return ab;
}

// From ArrayBuffer to Buffer:

function toBuffer(ab) {
  var buffer = new Buffer(ab.byteLength);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buffer.length; ++i) {
    buffer[i] = view[i];
  }
  return buffer;
}
