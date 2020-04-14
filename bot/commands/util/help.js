// Hey maxi im watching you 👀
exports.run = async (bot) => {
  bot.registerCommand("help", async (message, args) => {
    await bot.checkUserAndGuild(message)

    const commandDetails = (name, usage, description, example=false, aliases=false) => {
      const detailEmbed = {
        embed: {
          title: name,
          description: description,
          color: bot.getEmbedColor(bot, message),
          fields: [
            {
              name: "Usage",
              value: usage
            }
          ],
          timestamp: new Date()
        }
      }
      if (example) {
        detailEmbed.embed.fields.push({
          name: "Example",
          value: example
        })
      }
      if (aliases) {
        detailEmbed.embed.fields.push({
          name: "Aliases",
          value: aliases
        })
      }
      return detailEmbed
    }

    if (!args[0] || args[0] == "admin") {
      const helpEmbed = {
        embed: {
          title: "Atlantis Help :trident:",
          color: bot.getEmbedColor(bot, message),
          description: `This is the full command list for ${bot.user.username}! For more info on what a command does do \`a!help <command name>\`\nThanks to \`pri8000#8266\` for the profile picture art!`,
          fields: [
            {
              name: "General",
              value: "`hunt`, `battle`, `owo`, `praycurse`, `huntbot`, `show`"
            },
            {
              name: "Util",
              value: "`atlantis`, `invite`, `stats`"
            },
            {
              name: "Admin (must be admin to use)",
              value: "`deluser`, `delbot`, `owochannel`, `welcome`"
            }
          ],
          footer: {
            text: "Atlantis Bot, made by `da strange boi#7087` with lots of love!"
          },
          timestamp: new Date()
        }
      }

      if (bot.admins.includes(message.author.id) && args[0] == "admin") {
        helpEmbed.embed.fields.push({name: "Bot Admin", value: "`ban`, `checkowo`, `status`, `servers`"})
      }
      if (message.author.id == "295255543596187650" && args[0] == "admin") {
        helpEmbed.embed.fields.push({name: "Bot Owner", value: "`eval`"})
      }

      bot.createMessage(message.channel.id, helpEmbed)
    }
    if (args[0]) {
      if (args[0].toLowerCase() == "admin") return
      // User wants more detail on command (a!help hunt)
      let commandDetailToSend
      switch (args[0].toLowerCase()) {
        case "hunt": commandDetailToSend = commandDetails("Hunt", "`a!hunt`", "Toggles the reminder for \`owo hunt\`", false, "`h`, `catch`"); break
        case "battle": commandDetailToSend = commandDetails("Battle", "`a!battle`", "Toggles the reminder for \`owo battle\`", false, "`b`, `fight`"); break
        case "owo": commandDetailToSend = commandDetails("OwO", "`a!owo`", "Toggles the reminder for \`owo\`"); break
        case "praycurse": commandDetailToSend = commandDetails("Praycuse", "`a!praycurse`", "Toggles the reminder for \`owo pray\` & \`owo curse\`", false, "`pray`, `curse`"); break
        case "huntbot": commandDetailToSend = commandDetails("Huntbot", "`a!huntbot`", "Toggles the reminder for \`owo huntbot\`", false, "`huntbot`"); break
        case "show": commandDetailToSend = commandDetails("Show", "`a!show`", "Shows what is enabled/disabled"); break
        case "atlantis": commandDetailToSend = commandDetails("Atlantis", "a!atlantis", "Sends an DM invite link to join Atlantis", false, "`atl`"); break
        case "invite": commandDetailToSend = commandDetails("Invite", "`a!invite`", "Invite Atlantis bot to your server"); break
        case "deluser": commandDetailToSend = commandDetails("Deluser", "`a!deluser add/delete <#channel mention>`", "Deletes user messages in a given channel", "`a!deluser add #general`"); break
        case "delbot": commandDetailToSend = commandDetails("Delbot", "`a!delbot add/delete <#channel mention>`", "Deletes bot messages in a given channel", "`a!delbot delete #owo`"); break
        case "owochannel": commandDetailToSend = commandDetails("OwO Channel", "`a!owochannel add/delete <#channel mention>`", "Deletes all messages expect \"owo\"", "`a!owochannel add #owo`"); break
        case "welcome": commandDetailToSend = commandDetails("Welcome", "`a!welcome add/delete <#channel mention>`", "Display a welcome card to new members in a given channel", "`a!welcome add #welcome`\n`a!welcome text Welcome {user} to **{server}**!`"); break
        case "ban": commandDetailToSend = commandDetails("Ban", "`a!ban <user id> <amount of days to delete their messages> <reason>`", "Bans a user from the guild", "a!ban 393096318123245578 2 stealing code"); break
        case "stats": commandDetailToSend = commandDetails("Stats", "`a!stats [@mention]`", "Show your OwO stats"); break
        case "checkowo": commandDetailToSend = commandDetails("Checkowo", "`a!checkowo <@mention / user id>`", "To get the count of all 'owo' messages a user has sent", "a!checkowo 296155961230622720"); break
        default: commandDetailToSend = {embed:{title:"Error",color:bot.color.red,description:"You have to add specify a command name",timestamp: new Date()}}; break
      }
      bot.createMessage(message.channel.id, commandDetailToSend)
    }

  }, {
    cooldown: 3000,
    cooldownMessage: "Whoa there slow down, the cooldown is 3 seconds!"
  })
}