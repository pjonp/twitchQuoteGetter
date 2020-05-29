const Twitch = require('tmi.js'),
  SETTINGS = require('./.hidden/settings.json'),
  fs = require('fs'),
  path = require("path");

let gettingQuotes = false,
  quoteTimer,
  quoteData = [],
  noQuote = 0;

//START TWITCH
const TWITCHBOT = new Twitch.client({
  options: {
    debug: false
  }, //see info/chat in console. true to enable.
  connection: {
    reconnect: true
  },
  identity: {
    username: SETTINGS.T_BOTUSERNAME,
    password: `oauth:${SETTINGS.T_BOTOAUTHTOKEN}`
  },
  channels: [SETTINGS.T_CHANNELNAME]
});

TWITCHBOT.connect().catch((err) => {
  console.log('****Twitch Connection Error:', err);
});

TWITCHBOT.on('connected', () => {
  setTimeout(() => {
    console.log('+++QUOTE GETTER BOT CONNECTED TO TWITCH CHANNEL:', TWITCHBOT.getChannels());
  }, 1500)
});


TWITCHBOT.on('message', (room, user, message, self) => {
  if (message.toLowerCase().startsWith(`@${SETTINGS.T_BOTUSERNAME}, no quote found`) || message === '!stop') {
    if (message === '!stop' && user.username === SETTINGS.T_CHANNELNAME) {
      quit();
    } else {
      noQuote++
      if(noQuote > 2) quit();
    };
  } else if (gettingQuotes) {
    if (user.username == SETTINGS.T_BOTUSERNAME || user.username == 'streamelements') {
      if (message.startsWith(`@${SETTINGS.T_BOTUSERNAME}, #`)) {
        let index = message.indexOf(":"),
          qnum = message.slice(0, index).replace(`@${SETTINGS.T_BOTUSERNAME}, #`, ''),
          qtext = message.slice(index + 1).trim(),
          quoteObj = {
            "id": qnum,
            "quote": qtext
          };
        quoteData.push(quoteObj);
        noQuote = 0;
      };
    };
  } else if (user.username === SETTINGS.T_CHANNELNAME && message.startsWith('!allthequotes')) {
    let startingQuote = parseInt(message.split(' ')[1])
    gettingQuotes = true;
    quoteLoop(startingQuote || 1, room);
  };
  return;
});

const quit = () => {
  clearTimeout(quoteTimer);
  gettingQuotes = false;
  console.log('!done');
  //SAVE FILE
  fs.writeFileSync(path.resolve(__dirname, './quoteDatabase.json'), JSON.stringify(quoteData, null, 4), 'UTF-8')
  quoteData = [];
  //clear data
};
const quoteLoop = (num, room) => {
  TWITCHBOT.say(room, `!quote ${num}`).catch();
  quoteTimer = setTimeout(() => {
    num++
    quoteLoop(num, room);
  }, 9000);
};
