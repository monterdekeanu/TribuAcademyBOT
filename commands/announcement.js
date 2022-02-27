
const { MessageEmbed, MessageAttachment } = require('discord.js');
const fs = require('fs');
var Jimp = require('jimp');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
var scholarInfo = require('./trbLeaderboard.json');
var request = require('request')
var battleInfo = require('./battleInfo.json');
const { Embed } = require('@discordjs/builders');
const { write } = require('jimp');
const { endianness } = require('os');
var axieTeam = [0, 0, 0]
var serverUp = true;
var invalidIsko = false;
module.exports = {
  category: 'Scholar',
  description: 'Returns Scholar Ronin Wallet',
  callback: async ({ interaction, message, text }) => {
    text = text.toUpperCase();
    const embed = new MessageEmbed()
    embed.setTitle("Tribu Academy Leaderboards")
      .setColor('ORANGE')
      .setImage('https://i0.wp.com/p2enews.com/wp-content/uploads/2021/09/AxieLeaderboard.jpg?fit=1024%2C576&ssl=1')
        message.channel.send({
          embeds: [{
            "type": "rich",
            "title": `Tribu Summer Madness Tournament`,
            "description": `We are happy to announce that this upcoming **July 5, 2022** will be our first ever **Tribu Summer Madness Tournament**.\n\nEveryone, including scholars and managers within Tribu Academy, **are invited to join** our Tribu Summer Madness Tournament.\n\nTournament Details:\n\n**Prize pool**: *5000 SLP*\n\n***Winner Takes All***\n\n**No Entrace Fee**\n\n**Tournament Flow**:\nSingle Elimination: Best of 1\nSemi-Finals: Best of 3\nFinals: Best of 3\n\nReact SLP Emoji if you wish to participate.`,
            "color": 0xffbc1f,
            "image": {
              "url": `https://gumlet.assettype.com/afkgaming%2F2021-07%2F1b98241e-ef6c-41a9-8593-656d27c77c85%2Faxie_cover.jpg?format=auto`,
              "height": 300,
              "width": 200
            }
          }]
        })
      },
  }