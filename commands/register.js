const { MessageEmbed, MessageAttachment } = require('discord.js');
const fs = require('fs');
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
  callback: async ({ interaction, message,text }) => {
    console.log(message.author.username + "#" + message.author.discriminator);
    // json data
    var username = message.author.username + "#" + message.author.discriminator;
    var jsonData = { "user": message.author.username , "ronin": text }
    console.log(username);
    fs.readFile('./json/newLeader.json','utf-8',(err, jsonString)=>{
      if(err){
        console.log(err)
      } else {
        try{
          var data = JSON.parse(jsonString)
          // var finalData = []
          // finalData.push(data)
          data.push(jsonData)
          console.log(data)
          fs.writeFile('./json/newLeader.json',JSON.stringify(data,null,2),err=>{
            if(err){
              console.log(err)
            } else{
              console.log("newLeader Updated")
              message.channel.send(message.author.username + " is added into the leaderboard.");
            }
          })
        }catch(err){
          console.log("Error Parsing JSON " + err);
        }
      }
    })
  },
}