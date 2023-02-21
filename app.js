require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');


const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on('ready', (c) => {
  console.log(`✅ ${c.user.tag} is online.`);
});

client.on('interactionCreate', (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'hey') {
    return interaction.reply('hey!');
  }

  if (interaction.commandName === 'spotify') {
    return interaction.reply('Opening spotify!');
  }
});

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