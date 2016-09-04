// Dependencies
var _ = require('lomath');
var fs = require('fs');
// API as superclass that bot inherits methods from
var API = require(__dirname + '/API.js')

// The bot object prototype
// Bot extends and inherits methods of API
var bot = function(token, webhookUrl) {
    API.apply(this, arguments);
    // Set webhook on construction: override the old webhook
    this.setWebhook(webhookUrl || '');
}

// Set prototype to API
bot.prototype = API.prototype;
// Set constructor back to bot
bot.prototype.constructor = bot;


/**
 * Handles a Telegram Update object sent from the server. Extend this method for your bot.
 *
 * @category Bot
 * @param {Object} req The incoming HTTP request.
 * @param {Object} res The HTTP response in return.
 * @returns {Promise} promise A promise returned from calling Telegram API method(s) for chaining.
 */
bot.prototype.handle = function(req, res) {
    var update = req.body,
        message = update.message,
        message_text = message.text.toLowerCase(),
        user_id = message.from.id,
        chat_id = message.chat.id;

    if(message_text === '/bomb') {
      this.sendPhoto(chat_id, fs.createReadStream(__dirname+'/public/boom.jpg'), '').then(console.log);
    }

    if(message_text === '/serve') {
      this.sendMessage(chat_id, 'prepare your anus...');
      this.sendDocument(chat_id, fs.createReadStream(__dirname+'/public/hilarius.gif'), '');
      this.sendPhoto(chat_id, fs.createReadStream(__dirname+'/public/boom.jpg'), '');
      this.sendPhoto(chat_id, fs.createReadStream(__dirname+'/public/boom.jpg'), '');
      this.sendPhoto(chat_id, fs.createReadStream(__dirname+'/public/boom.jpg'), '');
    }

    if(message_text === '/rekt') {
      var msg = fs.readFileSync(__dirname+'/public/list_of_rekt.txt','utf8');
      var lines = msg.split('\n');
      var randomLine = lines[Math.floor(Math.random()*lines.length)];

      this.sendMessage(chat_id, '[ ] Not REKT\n' + randomLine);
    }

    if(message_text === '/mindblown') {
      this.sendMessage(chat_id, 'shit, son.');
      this.sendDocument(chat_id, fs.createReadStream(__dirname+'/public/mind_blown.gif'), '');
    }
}

// export the bot class
module.exports = bot;
