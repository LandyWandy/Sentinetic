const fetchTweets = require('./twitter.api')
const aiSentAnalysis = require('./chatgpt.api')

const runSentimentAnalysis = async () => {
    const formattedTweets = await fetchTweets();
    console.log(formattedTweets);
    aiSentAnalysis(formattedTweets);
}
runSentimentAnalysis();