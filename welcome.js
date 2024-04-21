

const client = (client) => {
   client.on("guildMemberAdd", member => { 
      const channelID = "1177180267283238935"; 
      console.log(member);
      const message = `ahlan <@${member.id}>, menwr el dnya ya wa7sh`;
      const channel = member.guild.channels.cache.get(channelID);
      channel.send(message); 
      const dmMessage = `ahlan beek fe el server ya m3lm ${member}`; 
      member.send(dmMessage).catch(err => { return; })
   }) }
module.exports = client;