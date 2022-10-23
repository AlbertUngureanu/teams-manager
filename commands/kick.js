const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let team = "";
  let roles = message.member.roles.map(r => `${r.name}`);
  for(var i in roles)
    if(roles[i].includes("Captain")) team = roles[i].split(" ");
  team = team[0];
  message.delete().catch();
  if(!team) return message.reply("nu faci parte din nicio echipa!").then(msg => msg.delete(5000));
  if(!(message.channel.id==='561649596812754966') )return ;
    if(!message.member.roles.find(r => r.name === `${team} Captain`))
        message.reply("doar capitanul echipei poate scoate un membru din echipa!").then(msg => msg.delete(5000));
    else {
        let kicked = message.guild.member(message.mentions.users.first());
        if(!kicked) return message.reply("pe cine vrei sa scoti din echipa?").then(msg => msg.delete(5000));
        if(!kicked.roles.find(r => r.name ===`${team} Team`))
            message.reply(`membrul ${kicked} nu face parte din echipa ta!`).then(msg => msg.delete(5000));
        else {
          console.log(`${kicked} a fost scos din echipa ${team} !`);
          kicked.removeRole(message.guild.roles.find(r => r.id ===  '564064388294639644'));
          kicked.removeRole(message.guild.roles.find(r => r.name ===  `${team} Team`));
          message.reply(`membrul ${kicked} a fost scos din echipa!`).then(msg => msg.delete(5000));
          kicked.send(`Salut! Imi pare rau sa te anunt dar ai fost scos din echipa ${team} de catre ${message.author}! Bafta in continuare!`);
        }
    }
}

module.exports.help = {
  name: "teamkick"
}
