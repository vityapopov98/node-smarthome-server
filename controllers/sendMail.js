import { Letter } from "../services/mail.js";
import { VolgogradEnergoSbytCounterLetter } from "../services/mailTamplates.js";
import fs from "fs";

const homeConfig = JSON.parse(fs.readFileSync("./config.json", "utf8"));

async function sendVolgogradEnergoSbytCounter(counterState) {
  //Создаем письмо
  //req.body.requestedEvent
  const letterDraft = new VolgogradEnergoSbytCounterLetter(
    homeConfig.users[0].login,
    counterState
  ).createLetter();
  console.log("Template: ", letterDraft);
  const mail = new Letter(letterDraft);
  return await mail.sendMail();
  // mail.sendMail().then((result) => {
  //   res.json({ status: result });
  // });
}

export { sendVolgogradEnergoSbytCounter };
