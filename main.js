const Akfissbot = require("./app/Akfissbot");
require("dotenv").config();

const token = process.env.TELEGRAM_TOKEN;
const options = { polling: true };

console.log("starting akfissbot...");
const akfissbot = new Akfissbot(token, options);

const main = () => {
  console.log("checking ...");
  akfissbot.getSticker();
  akfissbot.getHalo();
  akfissbot.getFollow();
  akfissbot.getQuote();
  akfissbot.getNews();
  akfissbot.getQuake();
  akfissbot.getWeather();
  akfissbot.getHelp();
  console.log("feature ready!");
};

main();
console.log("bot is ready now!");
