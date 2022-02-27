
const { MessageEmbed, MessageAttachment } = require('discord.js');
const fs = require('fs');
var Jimp = require('jimp');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
var scholarInfo = require('./scholarInfoJAX.json');
var request = require('request')
var battleInfo = require('./battleInfo.json');
var axieTeam = [0, 0, 0]
var errorStatus = false;
var invalidIsko = true;
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

    var logURL = "https://game-api.axie.technology/logs/pvp/" + returnIsko;
    fetch(logURL).then(response => {
      if(response.ok){
        return response.text()
      } else{
        throw new Error('API might have crashed')
}
    }).then(data => {
      //WORKING ON THIS 2022
      
      battleInfo = JSON.parse(data)

      tmpIsko = returnIsko.substring(6)
      tmpIsko = "0x" + tmpIsko;
      try{
          if (battleInfo.battles[0].first_client_id === tmpIsko) {
          axieTeam[0] = battleInfo.battles[0].first_team_fighters[0]
          axieTeam[1] = battleInfo.battles[0].first_team_fighters[1]
          axieTeam[2] = battleInfo.battles[0].first_team_fighters[2]
          invalidIsko = false;
        } else if (battleInfo.battles[0].second_client_id === tmpIsko) {
          axieTeam[0] = battleInfo.battles[0].second_team_fighters[0]
          axieTeam[1] = battleInfo.battles[0].second_team_fighters[1]
          axieTeam[2] = battleInfo.battles[0].second_team_fighters[2]
          invalidIsko = false;
        }
      } catch(e){
        console.log(e)
        
      }
      
    }).catch((error)=>{
      console.log(error)
      message.channel.send("Axie Infinity API is OFFLINE").then(msg => {
            setTimeout(() => msg.delete(), 3000)
          }).catch(e => {
          });
      errorStatus = true;
    }).then(() => {
      if(!invalidIsko){
        Jimp.read('https://storage.googleapis.com/assets.axieinfinity.com/axies/' + axieTeam[0] + '/axie/axie-full-transparent.png', (err, axie1) => {
        if (err) throw err;
        Jimp.read('https://storage.googleapis.com/assets.axieinfinity.com/axies/' + axieTeam[1] + '/axie/axie-full-transparent.png', (err, axie2) => {
          if (err) throw err;
          Jimp.read('https://storage.googleapis.com/assets.axieinfinity.com/axies/' + axieTeam[2] + '/axie/axie-full-transparent.png', (err, axie3) => {
            if (err) throw err;
            Jimp.read("blank.png", (err, base) => {
              if (err) throw err;
              base
                .resize(2400, 740)
                .blit(axie1, -120, 0)
                .blit(axie2, 600, 0)
                .blit(axie3, 1320, 0)
                .resize(500, 150)
                .quality(60)
                .write('axie.png');
            })

          })

        })

      })
      } else{
        Jimp.read('blank.png', (err, axie1) => {
        if (err) throw err;
        Jimp.read('blank.png', (err, axie2) => {
          if (err) throw err;
          Jimp.read('blank.png', (err, axie3) => {
            if (err) throw err;
            Jimp.read("blank.png", (err, base) => {
              if (err) throw err;
              base
                .resize(2400, 740)
                .blit(axie1, -120, 0)
                .blit(axie2, 600, 0)
                .blit(axie3, 1320, 0)
                .resize(500, 150)
                .quality(60)
                .write('axie.png');
            })

          })

        })

      })
      }
    }).then(() => {
      setTimeout(() => {
        if(!errorStatus){
          if (found) {
          var image = fs.readFileSync(path.join(__dirname, '../axie.png'))
          const attachment = new MessageAttachment(image, "axie.png");
          const embed = new MessageEmbed()
            .setColor('YELLOW')

          fetch('https://game-api.axie.technology/api/v1/' + returnIsko)
            .then(response => response.text())
            .then(data => {
              slpJSON = JSON.parse(data)
              var tempDate = new Date(slpJSON.last_claim * 1000)
              time = tempDate.toLocaleString();

            }).catch((error) => {
              console.error("Invalid Ronin Address")
            })
            .then(() => embed.setTitle(slpJSON.name + ' Scholarship Information: '))
            .then(() =>
              embed
                .addFields({
                  name: '**\t\t\t\t\t\t\t\t           <:AXS:867702806264414238>Ronin Address<:AXS:867702806264414238>**',
                  value: "```" + returnRonin + "```",
                  inline: false
                },
                  {
                    name: '**:shield: MMR**',
                    value: '```' + slpJSON.mmr + '```',
                    inline: true
                  },
                  {
                    name: '**:trophy: LEADERBOARDS**',
                    value: '```' + slpJSON.rank + '```',
                    inline: true
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
                .setImage('attachment://axie.png'))

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
        }
        
      }, 3000)
    })




  },
}