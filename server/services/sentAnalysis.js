// Importing chatgpt and mastadon APIs
const fetchTootsForAi = require('./mastadon.api');
const aiSentAnalysis = require('./chatgpt.api');

// Function to perform sentiment analysis on toots fetched from Mastodon
const runSentimentAnalysis = async (searchTerm) => {
  // Fetching toots using the search term
  const { tweets } = await fetchTootsForAi(searchTerm);
  
  // Extracting only the text content from the toots
  const tweetsTexts = tweets.map(tweet => tweet.text);
  
  // Performing sentiment analysis on the extracted text
  const sentimentResult = await aiSentAnalysis(tweetsTexts);

  // Logging and returning the results
  if (sentimentResult) {
    const { positive, negative, neutral } = sentimentResult;
    console.log({ searchTerm, tweets, positive, negative, neutral });
    return { searchTerm, tweets, positive, negative, neutral };
  } else {
    console.log('Sentiment analysis failed.');
    return null;
  }
};

// Exporting the combined function
module.exports = runSentimentAnalysis;