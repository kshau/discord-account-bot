const { MessageSender } = require("./MessageSender");

const TOKEN = process.env.TOKEN;

class WouldYouRather {

    static check(data) {

        if (data.content.startsWith("**Would You Rather**") && ["768181277814685706", "769568701753458719"].includes(data.author.id)) {

            MessageSender.react(data.id, "%F0%9F%85%B0%EF%B8%8F", data.channel_id, TOKEN);

            setTimeout(() => {
                MessageSender.react(data.id, "%F0%9F%85%B1%EF%B8%8F", data.channel_id, TOKEN);
            }, 700)

        }

    }

}

module.exports = {WouldYouRather};