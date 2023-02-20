require('dotenv').config()

const { Client, IntentsBitField } = require('discord.js');

const client = new Client({ 
  intents: [
    IntentsBitField.Flags.Guilds, 
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ], 
});

client.on('ready', (bot) => {
  console.log(`${bot.user.tag} is online`)
})

client.on('messageCreate', (message) => {
  if(message.content === '!hi'){
    message.reply('Hello!')
  }
})

client.login(process.env.BOT_TOKEN);