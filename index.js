const {Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, Embed} = require(`discord.js`);
const prefix = "!"
const client = new Client({intents:[GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences]});
const welcome = require("./welcome.js");
const leave = require("./leave.js");
client.on("ready", ()=>{
    console.log("el bot sha8al dlw2ti");
    welcome(client);
    leave(client);

})
client.on("messageCreate", (message)=>{
    if(!message.content.startsWith(prefix)|| message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    //msg array, wtv the heck this is 
    const messageArray = message.content.split(" ");
    const argument = messageArray.slice(1);
    const cmd = messageArray[0];
    // COMMANDS
    //TEST_ELDONYA EH
    if(command === "الدنيا_ايه"){
        message.channel.send("غير كام جدع بمسي عليه، غير كام حسود اودي عليه، معايا ما يكفي اجبي عليك ياه");
    }
    //BAN
    if(command == "بالسلامة_خالص"){
        const member = message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === argument.slice(0).join(" " || x.user.username === argument[0]))
        if(!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return message.channel.send("ماينفعش تعمل حظر للناس ماتستهبلش");
        if(!member) return message.channel.send("نسيت تحدد عايز تعمل حظر لمين");
        if(message.member == member) return message.channel.send("انت بتعمل ايه يا عم؟ بتنتحر يعني ولا بتعمل ايه مش فاهم");
        if(!member.kickable) return message.channel.send("الراجل دا عنده حصانة ماينفعش تعمل له حظر");
        let reason = argument.slice(1).join(" ") || "لسبب غير معروف";
        const embed = new EmbedBuilder()
        .setColor("#0000FF")
        .setDescription(`${reason} ركب السفينة علشان ${member.user.tag} :white_check_mark:`)

        const dmEmbed = new EmbedBuilder()
        .setColor("#0000FF")
        .setDescription(`${reason} علشان ${message.guild.name} يئسفني اقول لك انك اتعمل لك حظر من سيرفر`)

        member.send({embeds: [dmEmbed]}).catch(err => {
            console.log(` قافل الرسايل تقريبا.. مش عارف ابعتله ${member.user.tag}`)
        })

        member.ban().catch(err => {
            message.channel.send("فيه مشكلة حصلت مش عارف اعمل حظر ");
        });
        message.channel.send({embeds: [embed]});
    }

        //UNBAN
        if (command === "فك_حظر") {
           const member = args[0];
           let reason = argument.slice(1).join(" ") || `khalas b2a elly 7asal 7asal`; 
           const embed = new EmbedBuilder()
           .setColor("#0000FF")
           .setDescription(`:white_check_mark: kafara ya <@${member}>, w7shtna ya ragel`)

           message.guild.bans.fetch()
              .then(async bans => {
                 if(bans.size == 0) return message.channel.send(`mafish wla ma5lo2 ma3mol lo ban fel server da`);
                 let bannedID = bans.find(ban => ban.user.id == member);
                 if(!bannedID) return await message.channel.send(`ana mesh 3amel ban l7ad bel ID da`);
                 await message.guild.bans.remove(member, reason).catch(err => {
                    return message.channel.send("7asal moshkela wna bafok el 7azr :(");
                           })
                 await message.channel.send({embeds: [embed] })
                   }) };
        //MUTE
        if(command === "بالسلامة"){
           const timeUser = message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === argument.slice(0).join(" " || x.user.username === argument[0]));
           const duration = argument[1];
           if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) return message.channel.send("ماينفعش تعمل ميوت لحد انت ولا حاجة هنا");
           if (!timeUser) return message.channel.send("مش فاهم عايزني اعمل ميوت لمين");
           if(message.member === timeUser) return message.channel.send("ماينفعش تعمل ميوت لنفسك يابا ايه الهزار دا");
           if(!duration) return message.channel.send("حدد مدة الميوت قد ايه");
           if(duration > 604800) return message.channel.send("اقصي مدة للميوت اسبوع يا باشا");
           if(isNaN(duration)) {
               return message.channel.send("لازم مدة الميوت تتكتب ارقام");
           }
           let reason = argument.slice(2).join(" ") || "men 8er sabab, howa keda";
           const embed = new EmbedBuilder()
           .setColor("#0000FF")
           .setDescription(`:white_check_mark: ${timeUser.user.tag} mamno3 men el kalam le modet ${duration} d2ee2a 3alasahan: ** ${reason}**`)

           const dmEmbed = new EmbedBuilder()
           .setColor("#0000FF")
           .setDescription(`:white_check_mark: ye2sefny a2ol lk enak mamno3 men el kalam fe server ${message.guild.name} le modet ${duration} 3lshan ${reason}`)

           timeUser.timeout(duration * 1000, reason);
           message.channel.send({embeds: [embed]});
           timeUser.send({embeds: dmEmbed}).catch(err => {
               return;
           })
       }

       //UNMUTE
       if (command === "كفاية_كدة"){
         const timeUser = message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === argument.slice(0).join(" " || x.user.username === argument[0]));
         if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) return message.channel.send("ماينفعش تشيل الميوت بتاع الراجل، لازم حد من المودز");
         if (!timeUser) return message.channel.send("بعد اذنك حدد الشخص اللي عايزني اشيل عنه الميوت");
         if(message.member === timeUser) return message.channel.send("ماتستهبلش"); 
         if(!timeUser.kickable) return message.channel.send("ماتستهبلش");
         let reason = "";
         const embed = new EmbedBuilder()
         .setColor("#0000FF")
         .setDescription(`:white_check_mark: afragna 3an ${timeUser.user.tag}, ahlan ya wa7sh`)
         const dmEmbed = new EmbedBuilder()
         .setColor("#0000FF")
         .setDescription(`:white_check_mark: efrag ya rayes.. el mute bta3ak fe server ${message.guild.name} etshal`)

         timeUser.timeout(null, reason);
         message.channel.send({embeds: [embed]});
         timeUser.send({embeds: [dmEmbed]}).catch(err =>{
            return;     
         })
         
       }
       //DM PEOPLE 
       if (command === "dm"){
         //member variable
         const member = message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === argument.slice(0).join(" " || x.user.username === argument [0]));
         //msg variable
         const m = args.slice(1).join(" ");
         if (!m) return message.channel.send("قول لي اقول ايه في الرسالة طا ! ");
         // send msg 
         member.send(m).catch(err => {
            return message.channel.send("مش عارف ابعت للراجل دا، شكله قافل الرسايل");
         })
         //send channel msg
         message.channel.send(`done ya rayes, ba3at le ${member.user.tag} resala, olt lo ${m}`)

       }

       //creating a button or something
       if (command === "button"){
        const {ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId("button")
            .setLabel("click this button!")
            .setStyle(ButtonStyle.Primary),
        );
        const embed = new EmbedBuilder()
        .setColor("#0000FF")
        .setDescription(`${message.author.tag}'s button!`)

        const embed2 = new EmbedBuilder()
        .setColor("#0000FF")
        .setDescription("اشطة انا بعت المسدج")

        message.channel.send({embeds:[embed], components:[button]});
        const collector = message.channel.createMessageComponentCollector();
        collector.on('collect', async i => {
            await i.update({embeds: [embed2], components: []})
            const m = message.author;
            m.send("test test test");
        })
       }
                   
     //SERVER MEMBERCOUNT
     if (command === "تعداد_السرفر"){
        const m = message.guild.memberCount;
        const b = message.guild.members.cache.filter(member => member.user.bot).size;
        const embed = new EmbedBuilder()
        .setColor("#0000FF")
        .setTitle(`تعداد السرفر`)
        .setDescription(`el server feeh ${m-b} member w ${b} bot`)

        message.channel.send({embeds: [embed] });
          }
     //ECHO COMMAND
     if(command === "قول"){
        const channel = message.mentions.channels.first();
        const m = argument.slice(1).join(" ");
        if(!channel) return message.channel.send("عايزني اتكلم فين ؟؟");
        if(!m) return message.channel.send("اقول ايه طا !!");
        channel.send(m);
        } 

      //PURGE COMMAND
      if(command === "امسح"){
        if(!message.member.permissions.has(PermissionsBitField.Flags.Administrator)){
            return message.channel.send("مينفعش تمسح مسدجات الناس يا عم في ايه");
        }
        const amount = parseInt(args[0]);
        if (isNaN(amount) || amount <= 0 || amount > 100){
            return message.reply("اديني عدد رسايل من 1 لـ100 وانا اقول معاك");
        }
        message.channel.bulkDelete(amount).then((deletedMessages)=> {
            message.channel.send(`tamam, masa7t ${deletedMessages.size} rasayel`).then((msg)=>{
                setTimeout(()=>{
                    msg.delete();
                }, 5000)
            })
        }).catch((error) => {
            console.error(error);
            message.channel.send("حصل مشكلة");
        })
     }

     //AVATAR COMMAND
     if(command === "صورة_بروفايل"){
        const member = message.mentions.members.first() || message.member; 
        const embed = new EmbedBuilder()
        .setColor("#008000")
        .setTitle(`avatar`)
        .setImage(member.user.displayAvatarURL({dynamic: true, size: 512}))

        message.channel.send({ embeds: [embed] })
     }
     
});
    

client.login("MTIxNzQyNTA2ODQ5MDA5NjY0MA.G2_b4S.yEdZmhxRicfyL6_1jSpPS4WczlXHHClaqoo2uY");














