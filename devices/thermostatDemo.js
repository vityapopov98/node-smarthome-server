class ThermostatDemo {
  constructor(id, aedes) {
    this.id = id;
    this.name = "Термостат";
    this.aedes = aedes;

    this.dc = 0;
    this.hot = 22;
    this.cold = 10;
    this.tempReg = 0;
    this.heaterState = 0;
    this.pumpState = 0;
  }

  getRandomTemp() {
    const temp = [
      "22.55",
      "22.40",
      "22.30",
      "22.20",
      "22.15",
      "21.80",
      "23.65",
      "24.40",
    ];
    return temp[Math.floor(Math.random() * temp.length)];
  }

  loop() {
    setInterval(() => {
      console.log(
        "publishing...",
        `${
          this.id
        } ${this.getRandomTemp()} ${this.getRandomTemp()} 45.66 00.00 ${
          this.dc
        } 22 10 3 ${this.tempReg} 5 ${this.heaterState} ${
          this.pumpState
        } 0 0 0 0`
      );
      this.aedes.publish({
        cmd: "publish",
        qos: 2,
        topic: `${this.id}/state`,
        payload: Buffer.from(
          `${
            this.id
          } ${this.getRandomTemp()} ${this.getRandomTemp()} 45.66 00.00 ${
            this.dc
          } 22 10 3 ${this.tempReg} 5 ${this.heaterState} ${
            this.pumpState
          } 0 0 0 0`
        ),
        retain: false,
      });
    }, 5000);
  }

  setState(payload) {
    if (payload.indexOf("DC") !== -1) {
      this.dc = payload.substring(payload.indexOf(":") + 1, payload.length - 1);
    } else if (payload.indexOf("R") !== -1) {
      this.tempReg = payload.substring(
        payload.indexOf(":") + 1,
        payload.length - 1
      );
      if (this.tempReg == 0) {
        this.pumpState = 1;
        setTimeout(() => {
          this.heaterState = 1;
        }, 5000);
      } else {
        this.heaterState = 0;
        setTimeout(() => {
          this.pumpState = 0;
        }, 5000);
      }
    }
  }
}

export { ThermostatDemo };
