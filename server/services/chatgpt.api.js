const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.AI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// async function performSentimentAnalysis(tweets) {

// }
const tweets = [
    '@DC_Draino @pnjaban #Pocohantis  #Elisabeth warren is back?? #Trump is gonna have a feild day! #usa #maga',
    'Mike Pence Goes All-In On Supreme Court #MAGA #TRUMP2024 #Trump\n' +
      '\n' +
      'https://t.co/cTUe5PeiLM',
    'Pelosi Just Suffered Her 17th Loss #MAGA #TRUMP2024 #Trump\n' +
      '\n' +
      'https://t.co/ZIoxBFh7GI',
    `Trump falsely claims it's "illegal for me to say" whether He's ...  #MAGA #TRUMP2024 #Trump\n` +
      '\n' +
      'https://t.co/5kSRWkZGnL',
    'SYNTHETIC CUSTOM LACE WIG\n' +
      '\n' +
      '#SYNTHETICWIG #SYNTHETICLACEWIG #Trump #Canada #America #Cristiano #China #Messi #Israel #Ronaldo #Jorge #Stationhead #ariana #Asahi #Earth #taemin #Onana #Crimea #iPhone #Saudi #Ronaldo \n' +
      '#Russian #Robert https://t.co/VdF0AkZrak',
    'Best Impression Of Agonist\n' +
      '\n' +
      '#perfumeslover #perfumes #fragrance #cologne #scents #Trump #Canada #America #Cristiano #China #Messi #Israel #Ronaldo #Jorge #Stationhead #ariana #Asahi #Earth #taemin #Onana #Crimea #iPhone #Saudi #Ronaldo\n' +
      '#Russian #Robert https://t.co/haeOl1h27Y',
    '@heyitsmeCarolyn .\nAnd how many times did #Trump go there???�',
    'Democrat Arrested For 2nd Time In A Month #MAGA #TRUMP2024 #Trump\n' +
      '\n' +
      'https://t.co/4ZorY1RVy1',
    'Biden Loses To Trump At The Border #MAGA #TRUMP2024 #Trump\n' +
      '\n' +
      'https://t.co/2dGNTNuJ3O'
  ];
  
  const editedTweets = tweets.map(tweet => {
    // Remove emojis
    const removeEmoji = tweet.replace(/[\u{1F600}-\u{1F6FF}]/gu, '');
  
    // Remove backticks
    const removeBackticks = removeEmoji.replace(/`/g, '');
  
    // Extract text from the tweet
    const textMatch = removeBackticks.match(/^(.*?)(?:\s+#|$)/);
    const text = textMatch ? textMatch[1].trim() : '';
  
    return text;
  });
  
  console.log(editedTweets);

async function testQuery() {

const chatCompletion = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: 
  [{role: "user", 
    content: `Perform sentiment analysis on the tweets given. Return the number of positive, negative and neutral tweets in the format given here 'Positive:X Negative:Y Neutral:Z' ${editedTweets}`}],
    "temperature": .2
});
console.log(chatCompletion.data.choices[0].message)};

testQuery();