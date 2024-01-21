import TelegramBot from "node-telegram-bot-api";

// replace the value below with the Telegram token you receive from @BotFather
const token = "5438011304:AAFWzxMJkiYMmF6Dm8T-a7qZg_tGWpL_8IE";
const botUsers = [165557795];

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on("message", (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, "Received your message");
});

export const mqttUpdate = (topic, payload) => {
  botUsers.forEach((user) => {
    //Добавить файл конфиг что слать что не слать
    // можно просто укащать список топиков, хоть просто .txt файл, где каждая строка это новый топик
    // if(topic === 'заданный топик'), то отсылаем
    if (topic === "THS11002/test") {
      bot.sendMessage(user, `topic: ${topic}, payload: ${payload}`);
    }
  });
};
