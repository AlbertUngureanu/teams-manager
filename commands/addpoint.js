const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let team = args.join(" ");
  message.delete().catch();
  if(!team) return message.reply("nu ai ales nicio echipa!").then(msg => msg.delete(5000));
  if(team.includes("Team")) return message.reply("fara **Team**").then(msg => msg.delete(5000));
  if(!(message.channel.id==='562961972367327232') )return ;
  if(!message.guild.roles.find(r => r.name ===  `${team} Captain`)) return message.reply("nu am gasit aceasta echipa!").then(msg => msg.delete(5000));
  let capitan = message.guild.roles.find(r => r.name ===  `${team} Captain`).members.map(m=>m.user);
  let capitanu = message.guild.member(capitan[0]);
  let roles = capitanu.roles.map(r => `${r.name}`);
  let wins = "0";
  for(var i in roles)
    if(roles[i].includes("wins")) wins = roles[i].split(" ");
  let newwin = parseInt(wins[0], 10)+1;
  let lastwin = newwin - 1;
  let win = message.guild.roles.find(r => r.name === `${newwin} wins`);
    if(!win)
    {
        try{
            win = await message.guild.createRole({
                name: `${newwin} wins`,
                color: "#d9f442",
                permissions: []
            })
          }catch(e){
              console.log(e.stack);
          }
    }
  if(!(wins[0] === '0'))
      capitanu.removeRole(message.guild.roles.find(r => r.name === `${lastwin} wins`));
  console.log(`${message.author.username} a adaugat un punct echipei ${team}!`);
  capitanu.addRole(win);
}

module.exports.help = {
  name: "teamaddpoint"
}
