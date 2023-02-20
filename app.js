require('dotenv').config()
const fs = require('fs')
const path = require('path')
const express = require('express')
const { Client, Collection, Events, IntentsBitField } = require('discord.js');



const client = new Client({ 
  intents: [
    IntentsBitField.Flags.Guilds, 
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ], 
});

client.commands = new Collection()
const commandPaths = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandPaths).filter(file => file.endsWith('js'))

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

for(const file of commandFiles){
  const filePath = path.join(commandPaths, file)
  const command = require(filePath)
  client.commands.set(command.data.name, command)
}

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isChatInputCommand()) {
    console.log(interaction.commandName)
    return;
  }
  
	const command = client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});


client.login(process.env.BOT_TOKEN);