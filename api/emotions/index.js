// Custom package provided by the api to work with it
const dotenv = require("dotenv");
const pd = require('paralleldots');

dotenv.config();

// Custom function to make post requests on the API
pd.apiKey = process.env.EMOTIONS_API_KEY;
const postEmotion = (text) => pd.emotion(text,"en")

module.exports = { postEmotion }