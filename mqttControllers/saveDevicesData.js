import fetch from "node-fetch";
import { database } from "../index.js";

function saveDevicesData(topic, payload) {
  const deviceType = topic.substring(0, 3);
  if (deviceType === "THS") {
    //saveToElastic("thermostat", { topic: topic, payload: payload });
    saveToNeDB("thermostat", { topic: topic, payload: payload });
  } else if (deviceType === "GTS") {
    //saveToElastic("gates", { topic: topic, payload: payload });
    saveToNeDB("gates", { topic: topic, payload: payload });
  }
}

function saveToElastic(eindex, data) {
  // const url = new URL(`http://192.168.0.28:9200/${eindex}/_doc`)
  console.log("sending to elastic", eindex, data);
  try {
    fetch(`http://192.168.0.28:9200/${eindex}/_doc`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (e) {}
}

function saveToNeDB(eindex, data) {
  // https://www.youtube.com/watch?v=TXkq04BvfYU
  console.log("saving to db");
  database.insert({ eindex, data });
}

export { saveDevicesData };
