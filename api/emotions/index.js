const axios = require("axios")
const pd = require('paralleldots');


const API_KEY = process.env.EMOTIONS_API_KEY;
const API_URL = process.env.EMOTIONS_API_URL;

pd.apiKey = "hgPXry29G2cZcizhPDuj6MzHgF3oJGiTfLKFr3wMnYA";

const postEmotion = (text) => pd.emotion(text,"en")


// const postEmotion = (text) => axios.post(`${API_URL}`, { text, api_key: API_KEY, lang_code: "es" });

module.exports = { postEmotion }