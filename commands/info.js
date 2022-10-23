const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  message.delete().catch();
  let team = args;
  if(!(message.channel.id==='561649596812754966') )return ;
  if(!message.guild.roles.find(r => r.name ===  `${team} Team`))
  {
    let roles = message.member.roles.map(r => `${r.name}`);
    for(var i in roles)
      if(roles[i].includes("Team")) team = roles[i].split(" ");
    team = team[0];
    if(!message.guild.roles.find(r => r.name ===  `${team} Team`))
    {
    return message.reply(`echipa **${team}** nu exista! ( comanda este -teaminfo team )`).then(msg => msg.delete(5000));
    }
  }
    let membrii = message.guild.roles.find(r => r.name ===  `${team} Team`).members.map(m=>m.user);
    if(!membrii) return ;
    let capitan = message.guild.roles.find(r => r.name ===  `${team} Captain`).members.map(m=>m.user);
    if(!capitan) return ;
    let roless = message.guild.member(capitan[0]).roles.map(r => `${r.name}`);
    let wins ="0";
    let poza = "";
    for(var i in roless)
      if(roless[i].includes("wins"))
        wins=roless[i].split(" ")[0];
    for(var i in roless)
      if(roless[i].includes(".jpg"))
        poza=`https://i.imgur.com/${roless[i]}`;
    let teamm = new Discord.RichEmbed()
        .setTitle(`**${team} Team**`)
        .addField("Membrii", membrii,true)
        .addField("Lider", capitan,true)
        .setDescription(`__Wins__: **${wins}**`)
        .setTimestamp()
        .setFooter("© Biznis")
        .setThumbnail(poza)
        .setColor(message.guild.roles.find(r => r.name ===  `${team} Team`).color);
    message.channel.send(teamm);

}

module.exports.help = {
  name: "teaminfo"
}
