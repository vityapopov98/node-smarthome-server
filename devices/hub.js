import fs from "fs";

const homeConfig = JSON.parse(fs.readFileSync("./config.json", "utf8"));

function deviceIdToByte(deviceId) {
  const types = {
    THS: [0, 0, 0, 1],
    TRM: [0, 0, 1, 0],
    ECO: [0, 0, 1, 1],
    RSN: [0, 1, 0, 0], //Rain sensor
    LSN: [0, 1, 0, 1], //Luminosity sensor
    ACT: [0, 1, 1, 0], //Actuator
    IRC: [0, 1, 1, 1], //Irrigation controller
    GTS: [1, 0, 0, 0], //Gates
    IMC: [1, 0, 0, 1], //Impulse counter
    ELC: [1, 0, 1, 0], //Electricity Counter
    WAC: [1, 0, 1, 1], //Water counter
  };
  const toBin = {
    "01": [0, 0, 0, 1],
    "02": [0, 0, 1, 0],
    "03": [0, 0, 1, 1],
    "04": [0, 1, 0, 0],
    "05": [0, 1, 0, 1],
    "06": [0, 1, 1, 0],
    "07": [0, 1, 1, 1],
    "08": [1, 0, 0, 0],
    "09": [1, 0, 0, 1],
    10: [1, 0, 1, 0],
    11: [1, 0, 1, 1],
    12: [1, 1, 0, 0],
    13: [1, 1, 0, 1],
    14: [1, 1, 1, 0],
    15: [1, 1, 1, 1],
  };
  console.log(`${deviceId.substring(0, 3)}`);
  console.log(types[`${deviceId.substring(0, 3)}`]);
  const binByte = [
    ...types[`${deviceId.substring(0, 3)}`],
    ...toBin[`${deviceId.substring(6, 8)}`],
    //...toBin[`${deviceId.substring(3, 5)}`],
  ].join("");
  // console.log("bin", binByte);
  // console.log("binary int", parseInt(binByte, 2));
  // console.log("bin buffer", Buffer.from([parseInt(binByte, 2)]));

  //return new Buffer.from([parseInt(binByte, 2)]); //Работает
  return parseInt(binByte, 2);
}

function sendConnectedDevicesToHub(hubId, aedes) {
  console.log(hubId);
  // let hubInfo = "";
  // homeConfig.home.rooms.forEach((room) => {
  //   room.devices.forEach((device) => {
  //     if (device.id === hubId) {
  //       hubInfo = device.connectedDevices;
  //     }
  //   });
  // });

  // console.log("sending", `${hubId}/setState`, deviceIdToByte(hubInfo));
  // aedes.publish({
  //   cmd: "publish",
  //   qos: 2,
  //   topic: `${hubId}/setState`,
  //   payload: deviceIdToByte(hubInfo),
  //   retain: false,
  // });

  let hubInfo = [];
  homeConfig.home.rooms.forEach((room) => {
    room.devices.forEach((device) => {
      if (device.id === hubId) {
        console.log("passing", device.connectedDevices);
        hubInfo.push(...device.connectedDevices);
      }
    });
  });

  const arrayOfDevices = hubInfo.map((device) => {
    return deviceIdToByte(device);
  });
  console.log("array buffer", arrayOfDevices);
  aedes.publish({
    cmd: "publish",
    qos: 2,
    topic: `${hubId}/setState`,
    payload: Buffer.from([...arrayOfDevices]),
    retain: false,
  });
}

export { deviceIdToByte, sendConnectedDevicesToHub };
