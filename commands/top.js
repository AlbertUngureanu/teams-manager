const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  message.delete().catch();
  if(!(message.channel.id === "561649596812754966")) return ;
  let roles = message.guild.roles.map(r => `${r.name}`);
  let echipe = [];
  let puncte = [];
  let echipe2 = [];
  let numar = 0;
  for(var i in roles)
    if(roles[i].includes("Captain"))
      echipe.push(roles[i]);
    //console.log(echipe);
  for(var i in echipe)
  {
    let capitan = message.guild.roles.find(r => r.name ===  `${echipe[i]}`).members.map(m=>m.user);
    if(capitan[0])
    {
      let cv = message.guild.member(capitan[0]);
      //console.log(cv);
      let rol = cv.roles.map(r => `${r.name}`);
      for(var j in rol)
        {
          if (rol[j].includes("wins"))
          {
            if(numar<=9)
            {
              puncte[numar]=rol[j].split(" ")[0];
              echipe2[numar]=echipe[i];
              numar++;
            }
          }
        }
    }
  }
  ///sortare
  for(var i=0; i<echipe2.length-1; i++)
  {
    if(puncte[i]<puncte[i+1])
    {
      let nr = puncte[i];
      puncte[i] = puncte[i+1];
      puncte[i+1] = nr;
      let numee = echipe2[i];
      echipe2[i] = echipe2[i+1];
      echipe2[i+1]=numee;
    }
  }
  ////TOP
  let topp = [];
  let pozitie = message.guild.roles.find(r => r.name === "RedFear Team").position;
  let cv = -1;
  for(var i in echipe2)
  {
    cv=cv+1;
    let loc = parseInt(i, 10)+1;
    let echipaa=echipe2[i].split(" ")[0];
    let rollll = message.guild.roles.find(r => r.name === `${echipaa} Team`);
    let capitannn = message.guild.roles.find(r => r.name === `${echipaa} Captain`);
    let pos = pozitie-loc-cv;
    if(puncte[i]==='1')
    {
      topp.push(`__**Locul ${loc}**__: ${rollll} cu **${puncte[i]} punct**! `);
      await rollll.setPosition(pos);
      await capitannn.setPosition(pos);
    }
    else {
        await rollll.setPosition(pos);
        await capitannn.setPosition(pos);
      topp.push(`__**Locul ${loc}**__: ${rollll} cu **${puncte[i]} puncte**! `);
    }
  }
  let abdda = new Discord.RichEmbed()
      .setTitle(`**Top ${numar} echipe**`)
      .setTimestamp()
      .setFooter("© Biznis")
      .setColor("#00ba82")
      .setDescription(topp);
  message.channel.send(abdda);
}

module.exports.help = {
  name: "teams"
}
