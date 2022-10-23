const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    message.delete().catch();
    let name = args.join(" ");
    let verif = message.guild.roles.find(r => r.id == "564064388294639644");
    if(!(message.channel.id==='561649596812754966') )return ;
    if(message.member.roles.find(r => r ===verif))
    {
      message.reply("esti deja intr-o echipa!").then(msg => msg.delete(5000));
      return ;
    }
    if(!name)
    {
      message.reply("te rog sa alegi un nume pe care sa il aiba echipa ta!").then(msg => msg.delete(5000));
      return ;
    }
    else {
      let rol = message.guild.roles.find(r => r.name ===  `${name} Team`);
      if(rol)
      {
        message.reply("exista deja o echipa cu acest nume!").then(msg => msg.delete(5000));
        return ;
      }
      else {
        let pozitie = message.guild.roles.find(r => r.name === "Customs Public");
          try{
              rolec = await message.guild.createRole({
                  name: `${name} Captain`,
                  color: "#00001a",
                  position:pozitie.position+1,
                  permissions: []
              })
            }catch(e){
                console.log(e.stack);
            }
            try{
                role = await message.guild.createRole({
                    name: `${name} Team`,
                    color: Math.floor(Math.random() * 16777214) + 1,
                    hoist: true,
                    mentionable: true,
                    position:pozitie.position+1,
                    permissions: []
                })
              }catch(e){
                  console.log(e.stack);
              }
          let chan = message.guild.channels.find(r => r.id === "562961972367327232");
          message.author.send(`Cererea ta pentru a creea echipa **${name}** a fost trimisa catre staff!`)
          chan.send(`${message.author} a facut cerere pentru a creea echipa ${name}`).then(msg => {
                      msg.react('✅').then (r => {
                          msg.react('❌')
                      const da = (reaction, user) => reaction.emoji.name === '✅' && user.id != `563734083293675535`;
                      const nu = (reaction, user) => reaction.emoji.name === '❌' && user.id != `563734083293675535`;
                      const dap = msg.createReactionCollector(da, {});
                      const nup = msg.createReactionCollector(nu, {});
                      dap.on('collect', r=>{
                        msg.delete().catch();
                        msg.channel.send(`Echipa ${name} a fost acceptata!`);
                        message.author.send(`Salut! Echipa **${name}** a fost creata cu  succes!`);
                        console.log(`${message.author.username} a creeat echipa ${name} !`);
                        message.member.addRole(role);
                        message.member.addRole(rolec);
                        message.member.addRole(verif);


                      })
                      nup.on('collect', r=>{
                          msg.delete().catch();
                          msg.channel.send(`Echipa ${name} a fost respinsa!`);
                          message.author.send("Imi pare rau dar echipa ta a fost respinsa!");
                          let echipa = message.guild.roles.find(r => r.name ===  `${name} Team`);
                          let echipaa = message.guild.roles.find(r => r.name ===  `${name} Captain`);
                          echipa.delete();
                          echipaa.delete();
                      })
                })
            })
      }
    }
}

module.exports.help = {
  name: "teamcreate"
}
