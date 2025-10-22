# Telegram Course Bot

This project is a Node.js-based Telegram bot designed to provide information about various online courses. It interacts with users through Telegram commands, fetches course data from an external API, and displays the information in a user-friendly format.

## Main Features

* **Course Information**: Fetches and displays details about available courses, including titles and descriptions.
* **Command-Based Interaction**: Users can interact with the bot using simple commands like `/start` and `/courses`.
* **API Integration**: Connects to a third-party API to retrieve the latest course information.
* **Asynchronous Operations**: Built with an asynchronous structure to handle API requests and bot responses efficiently.

## Technologies Used

* **Backend**: Node.js
* **Telegram Bot Framework**: [node-telegram-bot-api](https://www.npmjs.com/package/node-telegram-bot-api)
* **API Requests**: [axios](https://www.npmjs.com/package/axios) for making HTTP requests to the course API.
* **Environment Variables**: [dotenv](https://www.npmjs.com/package/dotenv) to manage secret keys and environment-specific configurations.

## Prerequisites

Before you begin, ensure you have the following installed:

* [Node.js](https://nodejs.org/en/) (version 14 or higher is recommended)
* [npm](https://www.npmjs.com/) (usually comes with Node.js)
* A Telegram Bot Token (you can get one from the [BotFather](https://t.me/botfather) on Telegram)

## Project Structure

```

.
├── app/
│   └── Akfissbot.js      
├── libs/
│   ├── commands.js       
│   └── constant.js       
├── .gitignore
├── main.js               
├── package.json
└── package-lock.json

````

## Usage

1.  **Clone this repository:**

    ```bash
    git clone [https://github.com/akfiss/akfissbot-telecourse-nodejs.git](https://github.com/akfiss/akfissbot-telecourse-nodejs.git)
    cd akfissbot-telecourse-nodejs
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up your environment variables:**
    Create a `.env` file in the root of the project and add your Telegram Bot Token:
    ```
    BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN
    ```

4.  **Run the application:**

    ```bash
    node main.js
    ```

    Once running, you can interact with your bot on Telegram.

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and create a pull request with your changes.

## License

Proyek ini dilisensikan di bawah [Lisensi MIT](LICENSE).
