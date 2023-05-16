import fs from "fs";

const homeConfig = JSON.parse(fs.readFileSync("./config.json", "utf8"));

class Room {
  constructor(id, name, devices, imageState) {
    this.id = id;
    this.name = name;
    this.devices = devices;
    this.imageState = imageState || "";
  }

  state() {
    // получение картинки состояния. может этот метод и не нужен
  }
  setState(topic, payload) {
    // установка нового в поле imageState новой картинки на основе состояния
    // если topic и payload совпадают с action кнопками комнаты
    // то по payload устанавливаем нужную картинку состояния

    // idКомнаты_состояние_3x
    // Состояния:
    //
    const deviceType = topic.substring(0, 3);
    console.log("Установим состояние комнаты", deviceType);
  }
}
const rooms = [];
//Вытаскиваем из Конфигурационного файла список всех комнат
function initRoomsObserver() {
  homeConfig.home.rooms.forEach((room) => {
    rooms.push(new Room(room.id, room.name, room.devices));
  });
  //console.log("init rooms observer", rooms);
}
function observeRoomsState(topic, payload) {
  //считываем с конфига все комнаты в массив
  // для каждой комнаты создаем объект Room
  //кладем observeRoomsState() в место, где проходит трафик MQTT

  //Ищем комнаты, которые подъодят к топику
  // То есть если в комнате есть такое устройство
  // и оно изменило свое состояние
  // то нужно изменять состояние комнаты
  // const matchedRooms = rooms.filter((room) => {
  //   console.log("devices in room", room.devices.length);
  //   for (let i = 0; i < room.devices.length; i++) {
  //     if (`${room.devices[i].id}/state` === topic) {
  //       console.log("device id topic", `${room.devices[i].id}/state`, topic);
  //       return true;
  //     } else {
  //       console.log("device id topic", `${room.devices[i].id}/state`, topic);
  //       return false;
  //     }
  //   }
  // });
  const matchedRooms = [];
  rooms.forEach((room) => {
    for (let i = 0; i < room.devices.length; i++) {
      if (`${room.devices[i].id}/state` === topic) {
        //console.log("device id topic", `${room.devices[i].id}/state`, topic);
        matchedRooms.push(room);
      } else {
        // console.log("device id topic", `${room.devices[i].id}/state`, topic);
      }
    }
  });
  //console.log("rooms observer matchedRooms", matchedRooms);
  if (matchedRooms) {
    matchedRooms.forEach((room) => {
      room.setState(topic, payload);
    });
  }
}

export { initRoomsObserver, observeRoomsState, Room };
