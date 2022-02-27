
const { MessageEmbed, MessageAttachment } = require('discord.js');
const fs = require('fs');
var Jimp = require('jimp');
QRCode = require('qrcode');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
var scholarInfo = require('./scholarinfo.json');
var request = require('request')
var battleInfo = require('./battleInfo.json');
var axieTeam = [0, 0, 0]
var invalidIsko = false;
var authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOjY5NzU4MSwiYWN0aXZhdGVkIjp0cnVlLCJyb25pbkFkZHJlc3MiOiIweDVmNDczNjQzMDUzZjIyOWU2ZTU1NTk4NzJhMGEwZGRjZTFjMjhjMGYiLCJldGhBZGRyZXNzIjoiMHgwM2I4ZjgwOGVlY2RiNjIxMjA5NTZmNTc2NDM4ZGE0MzNiZWIzNzAxIiwiaWF0IjoxNjM3MjEyMTIwLCJleHAiOjE2Mzc4MTY5MjAsImlzcyI6IkF4aWVJbmZpbml0eSJ9.YClp5far77Oc3SGTNbGlq7oN88FaKIIKIVO7Zp9bVxY';
module.exports = {
  category: 'Scholar',
  description: 'Returns Scholar Ronin Wallet',
  callback: async ({ interaction, message, text }) => {
    text = text.toUpperCase();
    var time = '';
    var returnName = '';
    var returnRonin = '';
    var returnIsko = '';
    var found = false;
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

    scholarInfo.some((e) => {
      if (e.ID === text) {
        returnName = e.name;
        returnRonin = e.ronin;
        returnIsko = e.isko;

        found = true;
      }
    })

    QRCode.toFile('./qr.png',returnRonin,{
        color: {
            dark: '#ffffff',
            light: '#0000'
        },
        width: 350    
    }, function(err){
        if(err) throw err
         console.log ('done')
     })
      setTimeout(() => {
        if (found) {
          var image = fs.readFileSync(path.join(__dirname, '../qr.png'))
          const attachment = new MessageAttachment(image, "qr.png");
          const embed = new MessageEmbed()
            .setColor('YELLOW')

          fetch('https://game-api.axie.technology/api/v1/' + returnIsko)
            .then(response => response.text())
            .then(data => {
              slpJSON = JSON.parse(data)
              var tempDate = new Date(slpJSON.last_claim * 1000)
              time = tempDate.toLocaleDateString("en-US");

            }).catch((error) => {
              console.error("Invalid Ronin Address")
            })
            .then(() => embed.setTitle(slpJSON.name + ' Pay-Out Details: '))
            .then(() =>
              embed
                .addFields({
                  name: '**\t\t\t\t\t\t\t\t<:AXS:867702806264414238>Ronin Address<:AXS:867702806264414238>**',
                  value: "```" + returnRonin + "```",
                  inline: false
                },
                  {
                    name: '**<:SLP:867702777433686046> Total SLP**',
                    value: '```' + slpJSON.in_game_slp + '```',
                    inline: true
                  },
                  {
                    name: '**:timer: Last Claimed: **',
                    value: '```' + time + '```',
                    inline: true
                  }
                )
                .setImage('attachment://qr.png'))

            .then(() => {

              // row.addComponents(
              //     new MessageButton()
              //         .setCustomId('SLP')
              //         .setLabel('SLP: '+currentSLP)
              //         .setStyle('SUCCESS')
              // )
            }).then(() => message.channel.send({ embeds: [embed], files: [attachment] }))
            .catch(e => {
              console.log(e)
            })

          // const collector = message.createMessageComponentCollector({
          //     max: 1,
          //     time: 1000 * 15
          // })

          // collector.on('collect',(i: ButtonInteraction)=>{
          // })

        } else {
          message.channel.send(text + " is not yet registered.").then(msg => {
            setTimeout(() => msg.delete(), 3000)
          }).catch(e => {
          });

        }
      }, 3000)
  },
}