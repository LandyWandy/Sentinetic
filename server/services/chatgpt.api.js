const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const AI_API_KEY = process.env.AI_API_KEY;

const configuration = new Configuration({
  apiKey: AI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const aiSentAnalysis = async (tweets) => {
  try {
    const messageContent = `Perform sentiment analysis on the tweets given. Return the number of positive, negative, and neutral tweets in the format given here 'Positive:X Negative:Y Neutral:Z' ${tweets.join('\n')}`;
    
    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: messageContent,
        },
      ],
      temperature: 0.2,
    });

    const response = chatCompletion.data.choices[0].message.content;

    const regexResult = response.match(/Positive: (\d+) Negative: (\d+) Neutral: (\d+)/);
    if (regexResult) {
      const positiveCount = parseInt(regexResult[1], 10);
      const negativeCount = parseInt(regexResult[2], 10);
      const neutralCount = parseInt(regexResult[3], 10);

      return {
        positive: positiveCount,
        negative: negativeCount,
        neutral: neutralCount,
      };
    } else {
      console.log("Failed to extract sentiment counts from the response.");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = aiSentAnalysis;
