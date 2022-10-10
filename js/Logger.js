class Logger {

    static log(text) {

        var datetime = new Date();
        console.log(`[${datetime.getUTCFullYear()}-${datetime.getUTCMonth() + 1}-${datetime.getUTCDate()} ${datetime.getUTCHours()}:${datetime.getUTCMinutes()}:${datetime.getUTCSeconds()} UTC] ${text}`);

    }

}

module.exports = {Logger}