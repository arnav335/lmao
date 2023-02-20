var prompt = require('prompt-sync')();
const mineflayer = require('mineflayer')
let host = prompt("What is ip of your server? ")
let port = prompt("What is port of your server? default is 25565::: ")
let ver = prompt("What version do you want?")
let spam = prompt("Write the message here which should be spammed..")
var nom = prompt("How many times should It be spammed?")
nom = parseInt(nom)



let botArgs = {
  host: host,
  port: port,
  version: ver
};

class MCBot {

  // Constructor
  constructor(username) {
    this.username = username;
    this.host = botArgs["host"];
    this.port = botArgs["port"];
    this.version = botArgs["version"];

    this.initBot();
  }

  // Init bot instance
  initBot() {
    this.bot = mineflayer.createBot({
      "username": this.username,
      "host": this.host,
      "port": this.port,
      "version": this.version
    });

    this.initEvents()
  }

  // Init bot events
  initEvents() {
    this.bot.on('login', () => {
      let botSocket = this.bot._client.socket;
      console.log(`[${this.username}] Logged in to ${botSocket.server ? botSocket.server : botSocket._host}`);
    });

    this.bot.on('spawn', async () => {
      console.log(`[${this.username}] Spawned in`);
      await this.bot.waitForTicks(0);
      this.bot.chat("/register anonyone_force anonyone_force");
      await this.bot.waitForTicks(0);
      this.bot.chat("/login anonyone_force");
      await this.bot.waitForTicks(0);
      this.bot.chat("/register anonyone_force");
      for(let i = 0; i<=nom; i++){
        await this.bot.waitForTicks(20);
        this.bot.chat("/msg @a " + spam)
        this.bot.chat(spam)
      }
    });

    this.bot.on('error', (err) => {
      if (err.code == 'ECONNREFUSED') {
        console.log(`[${this.username}] Failed to connect to ${err.address}:${err.port}`)
      }
      else {
        console.log(`[${this.username}] Unhandled error: ${err}`);
      }
    });
  }
}
let n = prompt("How many bots do you want to send?")
let usernamee = prompt("What should be the bot's username?(Under 14 characters)(should not contain spaces)(should not contain special symbols)")
let bots = [];
for(var num = 0; num < n; num++) {
    bots.push(new MCBot(usernamee+num))
}