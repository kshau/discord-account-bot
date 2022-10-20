const {Command} = require("./Command");
const {MessageSender} = require("../MessageSender");
const {fetch} = require("undici");

class CovidCommand extends Command {

    static command = "covid";

    static cooldownMs = 7000;
    static cooldowns = [];

    static description = "Shows COVID-19 stats :mask: | __<country?>__";

    static regionShortcutKey = {
        "ca": "canada", 
        "ind": "india", 
        "uk": "unitedkingdom", 
        "us": "unitedstates", 
        "usa": "unitedstates", 
    }

    static async getCovidJSON() {

        var covidRes = await fetch("https://api.covid19api.com/summary");
        var covidJSON = await covidRes.json();

        return covidJSON;

    }

    static call(args, data, token) {

        this.getCovidJSON()

            .then(json => {

                var region = this.getStitchedArguments(args, 0);
                var covidData;
                var regionText;

                if (region != undefined) {
                    region = this.regionShortcutKey[region.toLowerCase()];
                }

                var {Message, Global, Countries} = json;

                if (Message == "Caching in progress") {
                    MessageSender.reply(data.id, "**Currently collecting data! Please try that command in a few more seconds!** :x:", token, data.channel_id);
                }

                else if (region == undefined) {
                    covidData = Global;
                    regionText = "Worldwide :globe_with_meridians:";
                }

                else {

                    Countries.forEach(c => {
                        if (c.Slug.toLowerCase().replace(/-/g,"") == region.toLowerCase()) {
                            covidData = c;
                            regionText = `${covidData.Country} :flag_${covidData.CountryCode.toLowerCase()}:`;
                        }
                    })

                    if (covidData == undefined) {
                        MessageSender.reply(data.id, "**I don't recognize that region!** :earth_americas: :x:", token, data.channel_id);
                    }

                }

                if (covidData != undefined) {

                    var text = `**Region: **${regionText}\n
**New Confirmed: **${covidData.NewConfirmed.toLocaleString("en-US")} :sneeze:
**Total Confirmed: **${covidData.TotalConfirmed.toLocaleString("en-US")} :sneeze:\n
**New Deaths: **${covidData.NewDeaths.toLocaleString("en-US")} :dizzy_face:
**Total Deaths: **${covidData.TotalDeaths.toLocaleString("en-US")} :dizzy_face:
                    `

                    MessageSender.reply(data.id, text, token, data.channel_id);

                }

            })

    }


}

module.exports = {CovidCommand};
