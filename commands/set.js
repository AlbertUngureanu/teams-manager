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
        message.reply("doar capitanul echipei poate edita echipa!").then(msg => msg.delete(5000));
    else {
      if(!args[0]) return message.reply("trebuie sa mentionezi ce vrei sa schimbi ! (color / avatar)").then(msg => msg.delete(5000));
      if(args[0] === "color")
      {
        if(!args[1]) return message.reply("trebuie sa mentionezi culoarea! (ex: #ff0000)").then(msg => msg.delete(5000));
        let rol = message.guild.roles.find(r => r.name ===  `${team} Team`);
        if
          (args[1].includes("#")) rol.setColor(args[1]);
        else message.reply("trebuie sa pui un cod HEX al culorii respective").then(msg => msg.delete(5000));
        console.log(`${message.author.username} a schimbat culoarea echipei ${team}!`);
      }
      else if (args[0] === "avatar")
      {
        if(!args[1]) return message.reply("trebuie sa mentionezi imaginea! (ex: https://i.imgur.com/qG3pOTr.jpg)").then(msg => msg.delete(5000));
        let rol = message.guild.roles.find(r => r.name ===  `${team} Team`);
        console.log(args[1]);
        if (!(args[1].includes("https://imgur.com/") && args[1].includes(".jpg"))) return message.reply("trebuie sa pui un link de pe imgur, care sa se termine in .jpg (ex: https://imgur.com/qG3pOTr.jpg)").then(msg => msg.delete(7000));

          let capitan = message.member;
          try{
              link = await message.guild.createRole({
                  name: `${args[1].split("https://imgur.com/")[1]}`,
                  color: "#000000",
                  permissions: []
              })
            }catch(e){
                console.log(e.stack);
            }
          capitan.addRole(link);
          capitan.addRole(link);
          console.log(`${message.author.username} a schimbat imaginea echipei ${team}!`);
          let roless = capitan.roles.map(r => `${r.name}`);
            for(var i in roles)
              if(roles[i].includes(".jpg"))
              {
                let sterge = message.guild.roles.find(r => r.name === `${roles[i]}`);
                sterge.delete();
              }

     }
    }
}

module.exports.help = {
  name: "teamset"
}
