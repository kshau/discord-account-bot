class Command {

    static command = null;

    static listen(content, sender, token, channel_id) {

        if (content.toLowerCase().startsWith(this.command)) {

            var args = content.split(" ");
            this.call(args, sender, token, channel_id).then();

        }

    }

}

module.exports = {Command};