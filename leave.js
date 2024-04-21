


//masa2 el fol ya rayes, la ilaha illa allah 

const EmbedBuilder = require("discord.js");
const client = client => {
   client.on("guildMemberRemove", member => {
      const channelID = "1177180267283238935";
      const message = `htw7shna ya ${member}`; 
      const channel = member.guild.channels.cache.get(channelID);
      channel.send(message);
 })
 }

module.exports = client; 