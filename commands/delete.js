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
    if(!message.member.roles.find(r => r.name === `${team} Captain`) )
        message.reply("doar capitanul echipei poate sterge echipa!").then(msg => msg.delete(5000));
    else {
          let echipa = message.guild.roles.find(r => r.name ===  `${team} Team`);
          let capitan = message.guild.roles.find(r => r.name ===  `${team} Captain`);
          let roless = message.guild.member(message.member).roles.map(r => `${r.name}`);
          let poza = "";
          let wins = "";
          for(var i in roless)
            if(roless[i].includes(".jpg"))
              poza=roless[i];
          for(var i in roless)
                if(roless[i].includes("wins"))
                  wins=roless[i];
          let rolpoza = message.guild.roles.find(r => r.name ===  `${poza}`);
          message.reply(`esti sigur ca vrei sa stergi echipa ${team}?`).then(msg => {
                      msg.react('✅').then (r => {
                          msg.react('❌')
                      const da = (reaction, user) => reaction.emoji.name === '✅' && user.id === `${message.author.id}`;
                      const nu = (reaction, user) => reaction.emoji.name === '❌' && user.id === `${message.author.id}`;
                      const dap = msg.createReactionCollector(da, {time: 60000});
                      const nup = msg.createReactionCollector(nu, {time: 60000});
                      dap.on('collect', r=>{
                        let membrii = message.guild.roles.find(r => r.name ===  `${team} Team`).members.map(m=>m.user);
                        console.log(`${message.author.username} a sters echipa ${team} !`);
                        msg.delete().catch();
                        echipa.delete();
                        capitan.delete();
                        if(wins) message.member.removeRole(wins);
                        if(rolpoza) rolpoza.delete();
                        message.member.removeRole(message.guild.roles.find(r => r.name ===  `.`));
                        for(var i in membrii)
                          message.guild.member(membrii[i]).removeRole(message.guild.roles.find(r => r.id === `564064388294639644`));
                        message.reply(`Ok, echipa **${team}** a fost stearsa! bafta in continuare!`).then(msg => msg.delete(5000));
                      })
                      nup.on('collect', r=>{
                          msg.delete().catch();
                          message.reply(`Ok, bafta in continuare!`).then(msg => msg.delete(5000));
                      })
                })
            })
        }

  }

module.exports.help = {
  name: "teamdelete"
}
