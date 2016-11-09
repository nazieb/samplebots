"use strict";

const botkit = require("botkit");
const Twitter = require("twitter");

const controller = botkit.slackbot({});
controller.spawn({
  token: process.env.SLACK_TOKEN
}).startRTM();

const twitterClient = Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

controller.hears("tweet (.*)", ['direct_message'], (bot, message) => {
  twitterClient.post('statuses/update', {status: message.match[1]},  function(error, tweet) {
    if (error) {
      bot.reply(message, "Sorry but I can't post that to Twitter");
      return;
    }

    const tweetUrl = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`;
    bot.reply(message, `Here's your new tweet ${tweetUrl}`);
  });
});