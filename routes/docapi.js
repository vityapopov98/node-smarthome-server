const getAPI = {
  api: "api v1",
  _links: {
    _self: {
      rel: "self",
      method: "get",
      uri: "/",
    },
    // ----- Комнаты ------
    // home: {
    //   rel: "home",
    //   method: "get", //Массив этажей с комнатами
    //   uri: "/home",
    // },
    // getRoom: {
    //   rel: "getRoom",
    //   method: "get", // Добавляет комнату (Только Админ)
    //   uri: "/rooms/:name",
    // },
    // addRoom: {
    //   rel: "addRoom",
    //   method: "post", // Добавляет комнату (Только Админ)
    //   uri: "/rooms",
    // },
    // deleteRoom: {
    //   rel: "deleteRoom",
    //   method: "delete", // Удаляет комнату (Только Админ)
    //   uri: "/rooms/:name",
    // },
    // ------- Устройства -------
    getRoomDevices: {
      rel: "getRoomDevices",
      method: "get", // Получить список устройств комнаты
      url: "/rooms/:name/devices",
    },
    getDevices: {
      rel: "getDevices",
      method: "get", // массив всех устройств
      uri: "/devices",
    },
    getDevice: {
      rel: "getDevice",
      method: "get", // Получить список ВСЕХ устройств
      uri: "/devices/:id",
    },
    addDevice: {
      rel: "addDevice",
      method: "post",
      uri: "/devices",
    },
    deleteDevice: {
      rel: "deleteDevice",
      method: "delete",
      uri: "/devices/:id",
    },
    // ----- Пользователи -----
    getUsers: {
      rel: "getUsers",
      method: "get",
      uri: "/users",
    },
    getUser: {
      rel: "self",
      method: "get",
      uri: "/users/:login",
    },
    addUser: {
      rel: "addUser",
      method: "post",
      uri: "/users",
    },
    updateUser: {
      rel: "updateUser",
      method: "put",
      uri: "/users/:login",
    },
    deleteUser: {
      rel: "deleteUser",
      method: "delete",
      uri: "/users/:login",
    },
    // ---- Управление устройствами -----
    getThermostatSettings: {},
    updateThermostatSettings: {},
    getCounterSettings: {},
    updateCounterSettings: {},
    // ---- Управление автоматизацией и сценариями -------
    sendVolgogradEnergoSbytCounter: {
      rel: "sendVolgogradEnergoSbytCounter",
      method: "get",
      uri: "sendVolgogradEnergoSbytCounter/:deviceId",
    },
    // При создании автоматизации должны создаваться скрипты (функции)
    // И у них генерируется название
    // И в итоге В GET / в поле _links мы получаем динамически сгенерированное API
  },
};

const deviceAPI = (method) => {
  return {
    _links: {
      _self: {
        rel: "self",
        method: method,
        uri: "/devices",
      },
    },
    getRoomDevices: {
      rel: "getRoomDevices",
      method: "get", // Получить список устройств комнаты
      url: "/rooms/:name/devices",
    },
    getDevices: {
      rel: "getDevices",
      method: "get", // массив всех устройств
      uri: "/devices",
    },
    getDevice: {
      rel: "getDevice",
      method: "get", // Получить список ВСЕХ устройств
      uri: "/devices/:id",
    },
    addDevice: {
      rel: "addDevice",
      method: "post",
      uri: "/devices",
    },
    deleteDevice: {
      rel: "deleteDevice",
      method: "delete",
      uri: "/devices/:id",
    },
  };
};

const userAPI = (method) => ({
  _links: {
    _self: {
      rel: "self",
      method: method,
      uri: "/users",
    },
  },
  getUsers: {
    rel: "getUsers",
    method: "get",
    uri: "/users",
  },
  getUser: {
    rel: "self",
    method: "get",
    uri: "/users/:login",
  },
  addUser: {
    rel: "addUser",
    method: "post",
    uri: "/users",
  },
  updateUser: {
    rel: "updateUser",
    method: "put",
    uri: "/users/:login",
  },
  deleteUser: {
    rel: "deleteUser",
    method: "delete",
    uri: "/users/:login",
  },
});

export { getAPI, deviceAPI, userAPI };
