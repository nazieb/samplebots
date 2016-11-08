"use strict";

const botkit = require("botkit");

const controller = botkit.slackbot({});
controller.spawn({
  token: process.env.SLACK_TOKEN
}).startRTM();

controller.hears("hello", ['direct_mention'], (bot, message) => {
  bot.reply(message, "hello, there..");
});

controller.hears("good (morning|afternoon|evening)", ['direct_mention'], (bot, message) => {
  const greeting = `good ${message.match[1]} to you too!`;

  bot.reply(message, greeting);
});