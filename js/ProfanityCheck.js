const Fs = require("fs");
const Path = require("path");

var profanityListContent = Fs.readFileSync(Path.resolve(__dirname.replace("\\js", "").replace("/js", ""), "./profanity_list.txt")).toString();
var profanityList = profanityListContent.split("\n");

class ProfanityCheck {

    static hasProfanity(text) {

        var profane = false;

        profanityList.forEach(i => {

            if (text.toLowerCase().includes(i.toLowerCase().replace("\r", ""))) {
                profane = true;
            }

        })

        return profane;

    }

}

module.exports = {ProfanityCheck}