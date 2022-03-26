import { initRoomsObserver, observeRoomsState } from "./roomsMqttClients.js";
export default (aedes) => {
  console.log("Aedes is working");
  initRoomsObserver();

  aedes.on("clientError", function (client, err) {
    console.log("client error", client.id, err.message, err.stack);
  });

  aedes.on("connectionError", function (client, err) {
    console.log("client error", client, err.message, err.stack);
  });

  aedes.on("publish", function (packet, client) {
    //Когда кто-то публикует данные в какой-то топик
    if (client) {
      // console.log(packet)

      observeRoomsState(packet.topic, packet.payload.toString());
      //-------- по сути не нужно --------
      if (packet.payload.toString() != "") {
        //если поле данных не пустое
        console.log(packet.payload.toString());
      }
      //-------- конец не нужного ------
    }
  });

  aedes.on("subscribe", function (subscriptions, client) {
    //когда кто-то подписывается на какой-то топик
    if (client) {
      console.log("subscribe from client", subscriptions, client.id);
    }
  });

  aedes.on("client", function (client) {
    //когда к брокеру подключается новый клиент
    console.log("new client", client.id);
  });
};
