const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");
bot.commands = new Discord.Collection();
var port = process.env.PORT || 3000;


fs.readdir("./commands/", (err, files) =>{
  if(err)
    console.log(err);

    let jsfile=files.filter(f => f.split(".").pop() === "js");
    if(jsfile.lenght <= 0){
      console.log("Nu am gasit comenzile!!!");
      return ;
    }

    jsfile.forEach((f, i) =>{
      let props = require(`./commands/${f}`);
      console.log(`Comanda ${f} este gata sa fie folosita!!!`);
      bot.commands.set(props.help.name, props);
    });
});

bot.on("ready", async() => {
  console.log(`${bot.user.username} s-a trezit!`);
  bot.user.setActivity("with your teams.", {type: "PLAYING"});
});

bot.on("message", async message =>{

  if(message.author.bot) return ;

  if(message.channel.type === "dm") return ;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let cv = cmd.substring(0,1);
  let args= messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(1));
  if(prefix === cv)
    if(commandfile) commandfile.run(bot,message,args);
});


bot.login(botconfig.token);
