require('dotenv').config()

const { Client, GatewayIntentBits, Partials, GuildInviteManager, GuildMember } = require('discord.js')
const { ActivityType } = require('discord.js');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessageReactions
	],
	partials: [
		Partials.Message, 
		Partials.Channel, 
		Partials.Reaction
	]
})

client.on('ready', (c) => {
  console.log(`${c.user.username} is alive`)
  client.user.setActivity('always 👀', { type: ActivityType.Watching })
})

client.on('threadCreate', async (thread) => {
  thread.type == '12' ? thread.setInvitable(false) : ''
  const message = await thread.send('.')
  const mention = await message.edit('<@376595646687346690>')
  mention.delete()
})

client.on('messageReactionAdd', async (reaction, user) => {
  reaction.partial ? await reaction.fetch() : ''
  //Pin Messages
  reaction.emoji.id == '1342825416481701993' ? reaction.message.pin() : ''
  //Reaction Roles
  if(reaction.message.id == '1344113322253095025'){
    const member = reaction.message.guild.members.cache.find(member => member.id == user.id)
	//Degen
	reaction.emoji.id == '1339280931382624368' ? member.roles.add('1339161382154670090') :
	//Horror
	reaction.emoji.id == '1339576473903693886' ? member.roles.add('1340498582456766525') :
	//Femme Friends
	reaction.emoji.id == '1339280789061374032' ? member.roles.add('1345588848998219877') :
	//Man Cave
	reaction.emoji.id == '1339280878295322797' ? member.roles.add('1345617792946143322') :
	//Game Night
	reaction.emoji.id == '1360470069095960638' ? member.roles.add('1364311105580568586') :
	//Visual Novel Night
	reaction.emoji.id == '1346313722200850464' ? member.roles.add('1375828540272021527') : ''
  }
})

client.on('messageReactionRemove', async (reaction, user) => {
  reaction.partial ? await reaction.fetch() : ''
  //Unpin Messages
  if(reaction.emoji.id == '1342825416481701993'){
	reaction.message.unpin()
    reaction.message.reply({
      content: `Unpinned by ${user.displayName}`,
	  allowedMentions: {
	    repliedUser: false
	  }
    })
  }
  //Reaction Roles
  if(reaction.message.id == '1344113322253095025'){
    const member = reaction.message.guild.members.cache.find(member => member.id == user.id)
	//Degen
	reaction.emoji.id == '1339280931382624368' ? member.roles.remove('1339161382154670090') :
	//Horror
	reaction.emoji.id == '1339576473903693886' ? member.roles.remove('1340498582456766525') :
	//Femme Friends
	reaction.emoji.id == '1339280789061374032' ? member.roles.remove('1345588848998219877') :
	//Man Cave
	reaction.emoji.id == '1339280878295322797' ? member.roles.remove('1345617792946143322') :
	//Game Night
	reaction.emoji.id == '1360470069095960638' ? member.roles.remove('1364311105580568586') :
	//Visual Novel Night
	reaction.emoji.id == '1346313722200850464' ? member.roles.remove('1375828540272021527') : ''
  }
})

client.on('guildMemberAdd', (member) => {
  member.roles.add('1339266733831229533')
  member.roles.add('1393390109671292979')
})

client.on('messageCreate', async (message) => {
  if(message.content.includes('-archive') && message.channel.isThread(true)){
	const thread = message.channel
	const msg = await thread.send('Archiving initiated...')
	message.delete()
	for(threadMember of await thread.members.fetch())
	  threadMember[0] == '1341743813768646806' ? '' : await thread.members.remove(threadMember[0])
	thread.setLocked(true)
	thread.setArchived(true)
	msg.edit('Archiving complete')
  }
})

//BinBot
client.login(process.env.TOKEN)