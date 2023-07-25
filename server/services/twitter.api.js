const { TwitterApi } = require("twitter-api-v2");
require("dotenv").config();

const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const ACCESS_SECRET = process.env.ACCESS_SECRET;

const client = new TwitterApi({
  appKey: API_KEY,
  appSecret: API_SECRET,
  accessToken: ACCESS_TOKEN,
  accessSecret: ACCESS_SECRET,
});

const fetchTweetsForAi = async (searchTerm) => {
  try {
    const tweetsResponse = await client.v2.get("tweets/search/recent", {
      query: `${searchTerm} -is:retweet`,
      "tweet.fields": "public_metrics,created_at,lang",
      expansions: "author_id",
      "user.fields": "username",
      max_results: 50,
    });

    const {
      data: tweets,
      includes: { users },
    } = tweetsResponse;

    const editedTweets = tweets.filter((tweet) => tweet.lang === "en");
    const formattedTweets = editedTweets.map((tweet) => {
      const modifiedText = tweet.text
        .replace(/\n/g, "") // Remove newline characters
        .replace(/�/g, "") // Remove � symbol
        .replace(/\+/g, "") // Remove plus sign
        .replace(/[\u{1F600}-\u{1F6FF}]/gu, ""); // Remove emojis

      return {
        text: modifiedText,
        createdAt: tweet.created_at,
        likes: tweet.public_metrics.like_count,
        retweets: tweet.public_metrics.retweet_count,
        comments: tweet.public_metrics.reply_count,
      };
    });

    return {
      searchTerm: searchTerm,
      tweets: formattedTweets,
    };
  } catch (error) {
    console.error(error);
    return [];
  }
};

module.exports = fetchTweetsForAi;
