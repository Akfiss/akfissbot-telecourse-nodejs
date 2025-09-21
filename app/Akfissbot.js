const TelegramBot = require("node-telegram-bot-api");
const commands = require("../libs/commands");
const { helpTextMessage, invalidCommandMessage } = require("../libs/constant");

class Akfissbot extends TelegramBot {
  constructor(token, options) {
    super(token, options);
    this.on("message", (data) => {
      console.log(
        `Invalid Command Executed By ${data.from.username} => ${data.text}`
      );
      const isInCommand = Object.values(commands).some((keyword) =>
        keyword.test(data.text)
      );
      if (!isInCommand) {
        this.sendMessage(data.from.id, invalidCommandMessage, {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Panduan Pengguna",
                  callback_data: "go_to_help",
                },
              ],
            ],
          },
        });
      }
    });
    this.on("callback_query", (callback) => {
      const callBackName = callback.data;
      if (callBackName == "go_to_help") {
        this.sendMessage(callback.from.id, helpTextMessage);
      }
    });
  }
  getSticker() {
    this.on("sticker", (data) => {
      console.log("getSticker Executed By " + data.from.username);
      this.sendMessage(data.from.id, "😁");
    });
  }
  getHalo() {
    this.onText(commands.greeting, (data) => {
      console.log("getHalo Executed by " + data.from.username);
      this.sendMessage(data.from.id, `Halo juga, ${data.from.first_name}!`);
    });
  }
  getFollow() {
    this.onText(commands.follow, async (data, after) => {
      console.log("getFollow Executed by " + data.from.username);
      const botProfile = await this.getMe();

      this.sendMessage(
        data.from.id,
        `${botProfile.first_name} will follow you, ${after[1]}!`
      );
    });
  }
  getQuote() {
    // fetching quotes API
    this.onText(commands.quote, async (data) => {
      console.log("getQuote Executed by " + data.from.username);
      // ambil data quotes dari internet
      const quotesEndpoint = "https://api.kanye.rest/";
      // handling error gunakan try and catch error
      try {
        const apiCall = await fetch(quotesEndpoint);
        const { quote } = await apiCall.json();

        this.sendMessage(data.from.id, quote);
      } catch (error) {
        console.error(error);
        this.sendMessage(data.from.id, "maaf gabisa, coba lagi");
      }
    });
  }
  getNews() {
    this.onText(commands.news, async (data) => {
      console.log("getNews Executed by " + data.from.username);
      const newsEndpoint = "https://jakpost.vercel.app/api/category/indonesia";
      this.sendMessage(data.from.id, "mohon tunggu sebentar... ");
      try {
        const apiCall = await fetch(newsEndpoint);
        const response = await apiCall.json();
        const maxNews = 3;

        for (let i = 0; i < maxNews; i++) {
          const news = response.posts[i];
          const { title, image, headline, link } = news;
          this.sendPhoto(data.from.id, image, {
            caption: `Judul: ${title}\n\nHeadline: ${headline}\n\nLink: ${link}`,
          });
        }
      } catch (error) {
        console.log(error);
      }
    });
  }
  getQuake() {
    const quakeEndpoint = "https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json";

    try {
      this.onText(commands.quake, async (data) => {
        console.log("getQuake Executed by " + data.from.username);

        const apiCall = await fetch(quakeEndpoint);
        const response = await apiCall.json();
        const { gempa } = response.Infogempa;
        const { Wilayah, Magnitude, Tanggal, Jam, Kedalaman, Shakemap } = gempa;
        const imgSourceUrl = "https://data.bmkg.go.id/DataMKG/TEWS/" + Shakemap;

        this.sendPhoto(data.from.id, imgSourceUrl, {
          caption: `Info gempa terbaru: ${Tanggal} / ${Jam}:\n\nWilayah: ${Wilayah}\nBesaran: ${Magnitude} SR\nKedalaman: ${Kedalaman}\n\n`,
        });
      });
    } catch (error) {
      console.error(error);
    }
  }
  getWeather() {
    const weatherEndpoint =
      "https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=51.03.05.1006";

    // mapping kondisi cuaca ke emoji
    const weatherIcons = {
      Cerah: "☀️",
      "Cerah Berawan": "🌤",
      Berawan: "☁️",
      "Berawan Tebal": "🌥",
      "Hujan Ringan": "🌦",
      "Hujan Sedang": "🌧",
      "Hujan Lebat": "⛈",
      "Hujan Lokal": "🌦",
      Kabut: "🌫",
    };

    try {
      this.onText(commands.cuaca, async (data) => {
        console.log("getWeather Executed by " + data.from.username);

        const apiCall = await fetch(weatherEndpoint);
        const response = await apiCall.json();

        // ambil lokasi
        const { provinsi, kotkab, kecamatan, desa } = response.lokasi;

        // ambil 3 data cuaca terdekat
        const forecasts = [];
        const cuacaArray = response.data[0].cuaca;

        // flatten array 2D menjadi 1D
        const cuacaList = cuacaArray.flat();

        // ambil 3 data pertama
        for (let i = 0; i < 3; i++) {
          const item = cuacaList[i];
          const waktu = item.local_datetime;
          const suhu = item.t;
          const kondisi = item.weather_desc;
          const kelembapan = item.hu;

          // pilih emoji sesuai kondisi
          const ikon = weatherIcons[kondisi] || "❓";

          forecasts.push(
            `🕒 ${waktu}\n🌡 ${suhu}°C\n🌤 Kondisi: ${kondisi} ${ikon}\n💧 Kelembapan: ${kelembapan}%`
          );
        }

        // gabung jadi 1 pesan
        const pesan =
          `📍 Info Cuaca Terbaru\nWilayah: ${desa}, ${kecamatan}, ${kotkab}, ${provinsi}\n\n` +
          forecasts.join("\n\n");

        // kirim ke user telegram
        this.sendMessage(data.from.id, pesan);
      });
    } catch (error) {
      console.error(error);
    }
  }
  getHelp() {
    this.onText(commands.help, async (data) => {
      const botProfile = await this.getMe();
      this.sendMessage(data.from.id, helpTextMessage);
    });
  }
}
module.exports = Akfissbot;
