"use strict";
$(function () {
  let bot = new Bot({
    inputMessage: $('.inputMessage'),
    inputContainter: $('.inputContainter'),
    sendButton: $('#send-button'),
    messages: $('.messages'),
    classEnabled: 'send-enabled',
    snack: $('#snackbar-container'),
    chatArea: $('.chatArea')
  });

  bot.run();
});