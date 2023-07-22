const fetchTweetsForAi = require('./twitter.api');
const aiSentAnalysis = require('./chatgpt.api');

const runSentimentAnalysis = async (searchTerm) => {
  const { tweets } = await fetchTweetsForAi(searchTerm);
  // Extract only the text of each tweet
  const tweetsTexts = tweets.map(tweet => tweet.text);
  const sentimentResult = await aiSentAnalysis(tweetsTexts);

  if (sentimentResult) {
    const { positive, negative, neutral } = sentimentResult;
    console.log({ searchTerm, tweets, positive, negative, neutral });
    // Logs: { searchTerm: W, tweets: [..], positive: X, negative: Y, neutral: Z }
    return { searchTerm, tweets, positive, negative, neutral };
  } else {
    console.log('Sentiment analysis failed.');
    return null;
  }
};

module.exports = runSentimentAnalysis;
