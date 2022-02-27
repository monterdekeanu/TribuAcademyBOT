
const { MessageEmbed, MessageAttachment, Message } = require('discord.js');
const path = require('path');
var authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOjY5NzU4MSwiYWN0aXZhdGVkIjp0cnVlLCJyb25pbkFkZHJlc3MiOiIweDVmNDczNjQzMDUzZjIyOWU2ZTU1NTk4NzJhMGEwZGRjZTFjMjhjMGYiLCJldGhBZGRyZXNzIjoiMHgwM2I4ZjgwOGVlY2RiNjIxMjA5NTZmNTc2NDM4ZGE0MzNiZWIzNzAxIiwiaWF0IjoxNjM3MjEyMTIwLCJleHAiOjE2Mzc4MTY5MjAsImlzcyI6IkF4aWVJbmZpbml0eSJ9.YClp5far77Oc3SGTNbGlq7oN88FaKIIKIVO7Zp9bVxY';
module.exports = {
  category: 'help',
  description: 'Returns Tribu Acdemy Commands',
  callback: async ({ interaction, message, text }) => {
    const embed = new MessageEmbed().setColor('ORANGE')

    embed.setTitle("Tribu Academy Bot Commands")
    .addFields({
        "name": `!<code> ISKO<#>`,
        "value": `Shows scholar details under that specific management within Tribu Academy\n\n ex: *!png ISKO1 !krks ISKO2 !jax ISKO3*`
      },
      {
        "name": `!leaderboard`,
        "value": `Displays Tribu Academy Leaderboard`
      }
              )
      .setImage(`https://scontent.fcgy2-1.fna.fbcdn.net/v/t39.30808-6/252295002_121112580326071_4596592738239839701_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeFAUKqyuiqOfE3oRI4_nUTB6U3YJEM0MDLpTdgkQzQwMr5AGLBLiauP2tQZcSRpVtUQQ1BiTqskefS-fDdphxYp&_nc_ohc=h9qjMVi9K80AX82PyTB&_nc_zt=23&_nc_ht=scontent.fcgy2-1.fna&oh=00_AT88JNS8_2H3MtgaUNWXCEzFBGa8jDuByC5kP9s31BvjZg&oe=620E7681`)
      message.channel.send({embeds: [embed]})
    
  },
}