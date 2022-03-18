class Room {
  constructor(id, name, imageState) {
    this.id = id;
    this.name = name;
    this.imageState = imageState || "";
  }

  state() {
    // получение картинки состояния. может этот метод и не нужен
  }
  setState(topic, payload) {
    // установка нового в поле imageState новой картинки на основе состояния
    // если topic и payload совпадают с action кнопками комнаты
    // то по payload устанавливаем нужную картинку состояния
  }
}

function observeRoomsState() {
  //считываем с конфига все комнаты в массив
  // для каждой комнаты создаем объект Room
  //кладем observeRoomsState() в место, где проходит трафик MQTT
}

export { Room };
