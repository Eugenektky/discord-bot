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

client.on('messageCreate', async (message) => {
  try{
    if(message.content.toLowerCase() === '!'){
      await message.reply('How can I help you?')
    } 
      
    if(message.content.toLowerCase() === '!hello'){
      await message.reply('Hello!')
    }
  } catch (e) {
    console.log('Error')
  }
  
})

client.login(process.env.BOT_TOKEN);