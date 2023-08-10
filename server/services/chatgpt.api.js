// chatgpt api

// Importing required libraries and modules
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

// Fetching API key from environment variables
const AI_API_KEY = process.env.AI_API_KEY;

// Setting up configuration for OpenAI API
const configuration = new Configuration({
  apiKey: AI_API_KEY,
});

// Initializing OpenAI API client
const openai = new OpenAIApi(configuration);

// Function to analyze sentiment of given tweets using OpenAI API
const aiSentAnalysis = async (tweets) => {
  try {
    // Construct message for OpenAI with instructions and tweets
    const messageContent = `Perform sentiment analysis on the tweets given. Return the number of positive, negative, and neutral tweets in the format given here 'Positive:X Negative:Y Neutral:Z' ${tweets.join('\n')}`;
    
    // Make request to OpenAI API
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

    // Extract the response from OpenAI's result
    const response = chatCompletion.data.choices[0].message.content;

    // Use regex to extract sentiment counts from the response
    const regexResult = response.match(/Positive: (\d+) Negative: (\d+) Neutral: (\d+)/);
    if (regexResult) {
      // Convert extracted counts to integers and return
      return {
        positive: parseInt(regexResult[1], 10) || 0,
        negative: parseInt(regexResult[2], 10) || 0,
        neutral: parseInt(regexResult[3], 10) || 0,
      };
    } else {
      // Handle cases where sentiment counts are not found in the response
      console.log("Failed to extract sentiment counts from the response.");
      return null;
    }
  } catch (error) {
    // Handle potential errors
    console.error(error);
    return null;
  }
};

// Exporting the sentiment analysis function
module.exports = aiSentAnalysis;