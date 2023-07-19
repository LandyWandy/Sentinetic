const { TwitterApi } = require('twitter-api-v2');
require('dotenv').config();

const API_KEY = process.env.API_KEY
const API_SECRET = process.env.API_SECRET
const ACCESS_TOKEN = process.env.ACCESS_TOKEN
const ACCESS_SECRET = process.env.ACCESS_SECRET

const client = new TwitterApi({
  appKey: API_KEY,
  appSecret: API_SECRET,
  accessToken: ACCESS_TOKEN,
  accessSecret: ACCESS_SECRET,
});

const fetchTweets = async () => {
  try {
    const tweetsResponse = await client.v2.get('tweets/search/recent', {
      query: '#Barbie -is:retweet',
      'tweet.fields': 'public_metrics,created_at,lang',
      'expansions': 'author_id',
      'user.fields': 'username',
      max_results: 10
    });

    const { data: tweets, includes: { users } } = tweetsResponse;

    const editedTweets = tweets.filter(tweet => tweet.lang === 'en');
    const formattedTweets = editedTweets.map(tweet => {
      const modifiedText = tweet.text
        .replace(/\n/g, '') // Remove newline characters
        .replace(/�/g, '') // Remove � symbol
        .replace(/\+/g, '') // Remove plus sign
        .replace(/[\u{1F600}-\u{1F6FF}]/gu, ''); // Remove emojis
    
      return modifiedText;
    });

    console.log(formattedTweets);
  } catch (error) {
    console.error(error);
  }
}

// Call the function to fetch tweets
fetchTweets();