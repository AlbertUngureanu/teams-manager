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
        message.reply("doar capitanul echipei poate adauga membrii!").then(msg => msg.delete(5000));
    else {
      let invitat = message.guild.member(message.mentions.users.first());
      if(!invitat) return message.reply("pe cine vrei sa bagi in echipa?").then(msg => msg.delete(5000));
      if(invitat.roles.find(r => r.name === "."))
          message.reply(`${invitat} e deja intr-o echipa!`).then(msg => msg.delete(5000));
      else {
        invitat.send(`Salut, ${invitat}! ${message.author} te-a invitat in echipa **${team}** ! Vrei sa te alaturi acestei echipe? Ai un minut sa reactionezi cu raspunsul tau!`).then(msg => {
                    msg.react('✅').then (r => {
                        msg.react('❌')
                    const da = (reaction, user) => reaction.emoji.name === '✅' && user.id != '563734083293675535';
                    const nu = (reaction, user) => reaction.emoji.name === '❌' && user.id != '563734083293675535';
                    const dap = msg.createReactionCollector(da, {time: 60000});
                    const nup = msg.createReactionCollector(nu, {time: 60000});
                    dap.on('collect', r=>{
                      message.channel.send(`${invitat} a acceptat cererea de intrare in echipa.`).then(msg => msg.delete(5000));
                      console.log(`${invitat} a intrat in echipa ${team} !`);
                      msg.delete().catch();
                      invitat.send(`Bine ai venit in echipa **${team}**!`);
                      let roleteam = message.guild.roles.find(r => r.name === `${team} Team`);
                      let roleteamm = message.guild.roles.find(r => r.id ===  '564064388294639644');
                      invitat.addRole(roleteam);
                      invitat.addRole(roleteamm);
                    })
                    nup.on('collect', r=>{
                        message.channel.send(`${invitat} a refuzat cererea de intrare in echipa.`).then(msg => msg.delete(5000));
                        msg.delete().catch();
                        invitat.send(`Ok, bafta in continuare!`);
                    })
              })
          })
      }
    }
}

module.exports.help = {
  name: "teaminvite"
}
