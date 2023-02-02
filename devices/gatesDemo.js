// class GatesDemo {
//   constructor(id, aedes) {
//     (this.id = id), (this.aedes = aedes);
//     this.position = 100;
//   }
//   state() {
//     this.aedes.publish({
//       cmd: "publish",
//       qos: 2,
//       topic: `${this.id}/state`,
//       payload: Buffer.from(`${this.position}`),
//       retain: false,
//     });
//   }

//   async setState(payload) {
//     if (payload.indexOf("o") !== -1) {
//       if (this.position >= 0) {
//         for (let index = 0; index < 10; index++) {
//           await this.openGates();
//           //console.log("publish position: ", this.position);
//         }
//       } else {
//         this.aedes.publish({
//           cmd: "publish",
//           qos: 2,
//           topic: `${this.id}/state`,
//           payload: Buffer.from(`Ворота открыты`),
//           retain: false,
//         });
//       }
//     } else if (payload.indexOf("c") !== -1) {
//       if (this.position <= 100) {
//         for (let index = 0; index < 10; index++) {
//           await this.closeGates();
//           //console.log("publish position: ", this.position);
//         }
//       } else {
//         this.aedes.publish({
//           cmd: "publish",
//           qos: 2,
//           topic: `${this.id}/state`,
//           payload: Buffer.from(`Ворота закрыты`),
//           retain: false,
//         });
//       }
//     }
//   }

//   async openGates() {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         //from 100 to 0
//         if (this.position > 0 && this.position <= 100) {
//           this.position -= 10;
//           console.log("position should be: ", this.position);
//           this.aedes.publish({
//             cmd: "publish",
//             qos: 2,
//             topic: `${this.id}/state`,
//             payload: Buffer.from(`${this.position}`),
//             retain: false,
//           });
//         }
//         resolve("done");
//       }, 2000);
//     });
//   }
//   async closeGates() {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         //from 0 to 100
//         if (this.position >= 0 && this.position < 100) {
//           this.position += 10;
//           console.log("position should be: ", this.position);
//           this.aedes.publish({
//             cmd: "publish",
//             qos: 2,
//             topic: `${this.id}/state`,
//             payload: Buffer.from(`${this.position}`),
//             retain: false,
//           });
//         }
//         resolve("done");
//       }, 2000);
//     });
//   }
// }
// export { GatesDemo };
