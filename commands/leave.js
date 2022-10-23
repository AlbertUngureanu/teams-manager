const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let team = "";
  let roles = message.member.roles.map(r => `${r.name}`);
  for(var i in roles)
    if(roles[i].includes("Team")) team = roles[i].split(" ");
  team = team[0];
  message.delete().catch();
  if(!team) return message.reply("nu faci parte din nicio echipa!").then(msg => msg.delete(5000));
  if(!(message.channel.id==='561649596812754966') )return ;
    let capitan = message.guild.roles.find(r => r.name ===  `${team} Captain`);
    if(message.member.roles.find(r => r===capitan))
    {
      return message.reply(`nu poti iesi din echipa daca esti capitan! Poti doar sa o stergi!`).then(msg => msg.delete(5000));
    }
    let echipa = message.guild.roles.find(r => r.name ===  `${team} Team`);
    console.log(`${message.author.username} a iesit din echipa ${team} !`);
    message.member.removeRole(echipa);
    message.member.removeRole(message.guild.roles.find(r => r.name ===  `.`));
    message.reply(`ai parasit echipa ${team}!`).then(msg => msg.delete(5000));
    }

module.exports.help = {
  name: "teamleave"
}
