const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const AI_API_KEY = process.env.AI_API_KEY;

const configuration = new Configuration({
  apiKey: AI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const aiSentAnalysis = async (formattedTweets) => {
  try {
    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Perform sentiment analysis on the tweets given. Return the number of positive, negative, and neutral tweets in the format given here 'Positive:X Negative:Y Neutral:Z' ${formattedTweets}`,
        },
      ],
      temperature: 0.2,
    });

    console.log(chatCompletion.data.choices[0].message);
  } catch (error) {
    console.error(error);
  }
};

module.exports = aiSentAnalysis;
