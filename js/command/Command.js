const {MessageSender} = require("../MessageSender");

class Command {

    static command = null;

    static cooldownIds = [];

    static listen(content, msgId, sender, token, channel_id) {

        if (content.toLowerCase().startsWith(this.command)) {

            if (this.cooldownIds.includes(sender.id)) {
                MessageSender.send("**That command is on cooldown!**", token, channel_id);
            }

            else {

                var args = content.split(" ");

                this.call(args, msgId, sender, token, channel_id).then();
                this.cooldownIds.push(sender.id);

                setTimeout(() => {
                    this.cooldownIds.splice(this.cooldownIds.indexOf(sender.id), 1);
                }, 3000)

            }

        }

    }

}

module.exports = {Command};