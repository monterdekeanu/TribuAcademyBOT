
const { MessageEmbed, MessageAttachment } = require('discord.js');
const fs = require('fs');
var Jimp = require('jimp');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
var request = require('request')
var battleInfo = require('./battleInfo.json');
const { Embed } = require('@discordjs/builders');
const { write } = require('jimp');
const { endianness } = require('os');
var axieTeam = [0, 0, 0]
var serverUp = true;
var invalidIsko = false; module.exports = {
  category: 'Scholar',
  description: 'Returns Scholar Ronin Wallet',
  callback: async ({ interaction, message, text }) => {
    text = text.toUpperCase();

    var scholarInfo = require('../json/newLeader.json');
    var time = '';
    var returnName = '';
    var returnRonin = '';
    var returnIsko = '';
    var found = false
    var currentSLP = 0;
    var slpJSON = {
      "success": true,
      "cache_last_updated": 0,
      "draw_total": 0,
      "lose_total": 0,
      "win_total": 0,
      "total_matches": 0,
      "win_rate": 0,
      "mmr": 0,
      "rank": 0,
      "ronin_slp": 0,
      "total_slp": 0,
      "in_game_slp": 0,
      "last_claim": 0,
      "lifetime_slp": 0,
      "name": "Null",
      "next_claim": 0
    }
    var arrayOfScholars = []
    scholarInfo.forEach((e) => {
      arrayOfScholars.push([e.user, e.ronin])
    })
    console.log(scholarInfo)
    console.log(arrayOfScholars)
    const embed = new MessageEmbed()
    embed.setTitle("Tribu Academy Leaderboards")
      .setColor('ORANGE')
      .setImage('https://i0.wp.com/p2enews.com/wp-content/uploads/2021/09/AxieLeaderboard.jpg?fit=1024%2C576&ssl=1')
    var flag = 0
    var ranking = []
    function compareSecondColumn(a, b) {
      if (a[1] === b[1]) {
        return 0;
      }
      else {
        return (a[1] > b[1]) ? 1 : -1;
      }
    }
    console.log(arrayOfScholars)
    arrayOfScholars.forEach((leadRonin) => {
      fetch('https://game-api.axie.technology/api/v1/' + leadRonin[1])
        .then(response => response.text())
        .then(data => {
          slpJSON = JSON.parse(data)
          var scholarName = slpJSON.name + ""
          console.log(leadRonin[0])
          ranking.push([leadRonin[0], slpJSON.mmr])
        }).catch(() => {
          console.log("API is DOWN")
          flag = 1
          serverUp = false;
        })
    })
    if (serverUp) {
      console.log(serverUp)
      setTimeout(() => {
        ranking.sort(compareSecondColumn)
        ranking.reverse();
        var numRank = 1;
        ranking.forEach((e) => {
          if (numRank == 1) {
            console.log(e)
            embed.addFields({
              name: numRank + ". 🥇" + e[0],
              value: "MMR: " + e[1],
              inline: true
            })
          } else if (numRank == 2) {
            embed.addFields({
              name: numRank + ". 🥈" + e[0],
              value: "MMR: " + e[1],
              inline: true
            })
          } else if (numRank == 3) {
            embed.addFields({
              name: numRank + ". 🥉" + e[0],
              value: "MMR: " + e[1],
              inline: true
            })
          } else {
            embed.addFields({
              name: numRank + ". " + e[0],
              value: "MMR: " + e[1],
              inline: true
            })
          }
          numRank++;
        })
        message.channel.send({ embeds: [embed] })
      }, 5000)
    } else {
      message.channel.send("Leaderboard server is down... Please try again").then(msg => setTimeout(msg => {
        msg.delete()
      }), 5000)
    }
    if (flag == 1) {
      message.channel.send("Leaderboard server is down... Please try again").then(msg => setTimeout(msg => {
        msg.delete()
      }), 5000)
    }
  },
}