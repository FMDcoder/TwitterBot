const {TwitterApi} = require("twitter-api-v2");
const CronJob = require("cron").CronJob;
const fs = require('fs');

let rawjson = fs.readFileSync("config.json");
let data = JSON.parse(rawjson);

var client = new TwitterApi({
    appKey: data["APP_KEY"],
    appSecret: data["APP_SECRET"],
    accessToken: data["ACCESS_TOKEN"],
    accessSecret: data["ACCESS_SECRET"],
})

const tweet = async (message) => {
    try {
        await client.v1.tweet(message);
    } catch (error) {
        console.log(error);
    }
}

const job = new CronJob("0 15 * * *", () => {

    const thisYear = new Date().getFullYear();
    const nextYear = (thisYear + 1)

    const future = new Date(nextYear, 0, 1);
    const now = new Date();
    const progress = Math.floor((future - now) / 86400000);
        
    var msg = `There is ${progress} days left until ${nextYear}!`;

    tweet(msg);
});

job.start();