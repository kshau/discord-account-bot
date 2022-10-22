const {Command} = require("./Command");
const {MessageSender} = require("../MessageSender");

const {SayCommand} = require("./SayCommand");
const {ShipCommand} = require("./ShipCommand");
const {JokeCommand} = require("./JokeCommand");
const {QuoteCommand} = require("./QuoteCommand");
const { FlipCommand } = require("./FlipCommand");
const { RollCommand } = require("./RollCommand");
const { FactCommand } = require("./FactCommand");
const { DogCommand } = require("./DogCommand");
const { CatCommand } = require("./CatCommand");
const { CovidCommand } = require("./CovidCommand");
const { MemeCommand } = require("./MemeCommand");
const { InsultCommand } = require("./InsultCommand");
const { FoodCommand } = require("./FoodCommand");
const { ComicCommand } = require("./ComicCommand");
const { ArtCommand } = require("./ArtCommand");

class HelpCommand extends Command {

    static command = "help";

    static cooldownMs = 30000;
    static cooldowns = [];

    static description = null;

    static cmds = [
        {
            "category": "Animals :dog2:", 
            "commands": [
                CatCommand, 
                DogCommand
            ]
        }, 
        {
            "category": "Humor :rofl:", 
            "commands": [
                ComicCommand,
                JokeCommand, 
                MemeCommand
            ]
        }, 
        {
            "category": "Info :scroll:", 
            "commands": [
                CovidCommand,
                FactCommand
            ]
        }, 
        {
            "category": "RNG :game_die:", 
            "commands": [
                FlipCommand, 
                RollCommand
            ]
        }, 
        {
            "category": "Other :basket:", 
            "commands": [
                ArtCommand, 
                FoodCommand, 
                InsultCommand, 
                QuoteCommand, 
                SayCommand, 
                ShipCommand, 
            ]
        }, 
    ]

    static call(args, data, token) {

        var msg = ">>> **:dizzy: kshaurya731 :dizzy:**\n══════════════════\n";

        this.cmds.forEach(c => {

            msg += `__${c.category}__\n`;

            c.commands.forEach(c => {
                msg += `:arrow_right: **$${c.command}** - ${c.description}\n`
            })

            msg += "\n";

        });

        MessageSender.send(msg, token, data.channel_id);

    }


}

module.exports = {HelpCommand};