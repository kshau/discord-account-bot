const {Command} = require("./Command");
const {MessageSender} = require("../MessageSender");
const {fetch} = require("undici");

class CovidCommand extends Command {

    static command = "covid";

    static cooldownMs = 15000;
    static cooldowns = [];

    static description = "Shows COVID-19 stats :mask: | __<country?>__";

    static async getCovidJSON() {

        var covidRes = await fetch("https://api.covid19api.com/summary");
        var covidJSON = await covidRes.json();

        return covidJSON;

    }

    static call(args, data, token) {

        this.getCovidJSON()

            .then(json => {

                var region = this.getStitchedArguments(args);
                var regionData;

                var {Message, Global, Countries} = json;

                if (Message == "Caching in progress") {
                    MessageSender.reply(data.id, "Currently collecting data! Please try that command in a few more seconds! :x:", token, data.channel_id);
                }

                else if (region == undefined) {
                    regionData = Global;
                }

                else {

                    Countries.forEach(c => {
                        if (c.Slug.toLowerCase().replace(/-/g,"") == region.toLowerCase()) {
                            regionData = c;
                        }
                    })

                }

                var text = `**Region: **${regionData.Country} :flag_${regionData.CountryCode.toLowerCase()}:\n
**New Confirmed: **${regionData.NewConfirmed.toLocaleString("en-US")} :sneeze:
**Total Confirmed: **${regionData.TotalConfirmed.toLocaleString("en-US")} :sneeze:\n
**New Deaths: **${regionData.NewDeaths.toLocaleString("en-US")} :dizzy_face:
**Total Deaths: **${regionData.TotalDeaths.toLocaleString("en-US")} :dizzy_face:
                `

                MessageSender.reply(data.id, text, token, data.channel_id);

            })

    }


}

module.exports = {CovidCommand};
