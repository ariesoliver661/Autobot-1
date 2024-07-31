const axios = require('axios');

module.exports.config = {
  name: 'artoriasv2',
  version: '1.0.0',
  role: 0,
  hasPrefix: true,
  aliases: ['gpt-3.5', 'turbo'],
  description: "An AI command powered by GPT-3.5 Turbo",
  usage: "artoriasv2 [prompt]",
  credits: 'Developer',
  cooldown: 3,
};

module.exports.run = async function({ api, event, args }) {
  const input = args.join(' ');

  if (!input) {
    api.sendMessage(`Please provide a question or statement after 'artoriasv2'. For example: '!artoriasv2 What is the capital of France?'`, event.threadID, event.messageID);
    return;
  }

  api.sendMessage('Please wait...', event.threadID, event.messageID);

  try {
    const { data } = await axios.get(`https://nash-api-end.onrender.com/gpt-3_5-turbo?prompt=${encodeURIComponent(input)}`);
    const response = data.result.reply;

    api.sendMessage(response, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
  }
};
