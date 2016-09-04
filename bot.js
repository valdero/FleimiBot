// dependencies
var _ = require('lomath');
var fs = require('fs');
// API as superclass that bot inherits methods from
var API = require(__dirname + '/API.js')

// The bot object prototype
// bot extends and inherits methods of API
var bot = function(token, webhookUrl) {
    API.apply(this, arguments);
    // set webhook on construction: override the old webhook
    this.setWebhook(webhookUrl || '');

}

// set prototype to API
bot.prototype = API.prototype;
// set constructor back to bot
bot.prototype.constructor = bot;


/**
 * Handles a Telegram Update object sent from the server. Extend this method for your bot.
 *
 * @category Bot
 * @param {Object} req The incoming HTTP request.
 * @param {Object} res The HTTP response in return.
 * @returns {Promise} promise A promise returned from calling Telegram API method(s) for chaining.
 *
 * @example
 * var bot1 = new bot('yourtokenhere');
 * ...express server setup
 * app.route('/')
 * // robot API as middleware
 * .post(function(req, res) {
 *     bot1.handle(req, res)
 * })
 * // Then bot will handle the incoming Update from you, routed from Telegram!
 *
 */
bot.prototype.handle = function(req, res) {
    // the Telegram Update object. Useful shits
    var update = req.body,
        message = update.message,
        message_text = message.text.toLowerCase(),
        user_id = message.from.id,
        chat_id = message.chat.id;

    if(message_text === '/serve') {
      this.sendMessage(chat_id, 'Prepare your anus...');
      this.sendPhoto(chat_id, fs.createReadStream(__dirname+'/public/boom.jpg'), '').then(console.log);
      this.sendPhoto(chat_id, fs.createReadStream(__dirname+'/public/boom.jpg'), '').then(console.log);
      this.sendPhoto(chat_id, fs.createReadStream(__dirname+'/public/boom.jpg'), '').then(console.log);
    }

    if(message_text === '/rekt') {
      this.sendMessage(chat_id, 'Rekt.');
    }

    if(message_text == 'mbuid') {
        this.sendPhoto(chat_id, fs.createReadStream(__dirname+'/public/mind_blown.gif'), '').then(console.log);
        this.sendMessage(chat_id, 'shieeeeeeeeeeeeeeeeeee');
    }
    //this.sendMessage(chat_id, "you said: " + message.text);
}

// export the bot class
module.exports = bot;

// sample keyboard
// var kb = {
//     keyboard: [
//         ['one', 'two'],
//         ['three'],
//         ['four']
//     ],
//     one_time_keyboard: true
// }
