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
      query: '#memes -is:retweet',
      'tweet.fields': 'public_metrics,created_at,lang',
      'expansions': 'author_id',
      'user.fields': 'username',
      max_results: 10
    });

    const { data: tweets, includes: { users } } = tweetsResponse;

    const englishTweets = tweets.filter(tweet => tweet.lang === 'en'); // Only keep tweets that are in English

    // We'll now have an array of Tweet objects in `tweets`, and an array of user objects (authors of the tweets) in `users`

    console.log(englishTweets);
  } catch (error) {
    console.error(error);
  }
}

// Call the function to fetch tweets
fetchTweets();