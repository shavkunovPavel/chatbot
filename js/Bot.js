// Constructor
var Bot = function (props) {
  this.props = props;
  this.placeholders = this.getPlaceholders();
  this.answers = [];
}

// Returns placeholders for translating
Bot.prototype.getPlaceholders = function () {
  return {
    'type_here': 'Type here...',
    'choose': 'Choose from below…'
  };
}

// Start the bot
Bot.prototype.run = function () {
  this.props.sendButton.click(this.sendButtonClick.bind(this));
  this.props.inputMessage.on('input', this.messageInput.bind(this));
  this.props.inputMessage.on('keydown', this.messageInputKeyDown.bind(this));
  this.rollInput = $('<input name="demo" id="dateRollInput">');
  this.handleNextMessage();
}

// Save an answer for handle later
Bot.prototype.saveAnswer = function (message_id, answer_in) {
  let ans = this.answers.filter(function (aobj) {
    return aobj.id == message_id;
  });
  if (ans.length) {
    ans[0].answers.push(answer_in);
    return;
  }
  this.answers.push({id: message_id, answers: [answer_in]});
}

// Append a message and scroll to the bottom of the list
Bot.prototype.appendMessage = function (li_message) {
  this.props.messages.append(li_message);
  let last = $('li', this.props.messages).last();
  $(this.props.messages).animate({'scrollTop': last.position().top + last.height()}, {
    duration: 700
  });
}

// Handler for a message from an user
Bot.prototype.sendButtonClick = function () {
    if (!this.props.inputContainter.is('.' + this.props.classEnabled)) return;
    let user_text = this.props.inputMessage.val();
    if (user_text.length) {
      this.appendMessage($(helper.getAnswerItem(user_text)));
      this.saveAnswer(this.props.inputMessage.currentMessage.id, user_text);
      this.handleNextMessage();
    }
    this.props.inputMessage.val('');
    this.setEnabled('');
}

// Able to send a message by press Enter
Bot.prototype.messageInputKeyDown = function (event) {
  if (event.keyCode == 13) {
    this.sendButtonClick();
  }
}

// Disable/Enable sending
Bot.prototype.messageInput = function (event) {
    let input = $(event.currentTarget);
    this.setEnabled(input.val());
}

// Check the text and enable or disable send button
Bot.prototype.setEnabled = function (text) {
  this.props.inputContainter.removeClass(this.props.classEnabled);
  if (text && text.length) {
    this.props.inputContainter.addClass(this.props.classEnabled);
  }
}

// Add change listener to the roll hidden input
Bot.prototype.rollInputChange = function () {
  this.rollInput.on('change', (function (event) {
    this.props.inputMessage.val($(event.currentTarget).val());
    this.setEnabled(this.props.inputMessage.val());
  }).bind(this));
}

// Handle for a next message from the chat
Bot.prototype.handleNextMessage = function () {
  this.setUiType('');
  let message = chatText.nextMessage();
  if (message.text && message.text.length) {
    let liempty = $(helper.getEmptyItem());
    this.appendMessage(liempty);
    setTimeout((function () {
      liempty.remove();
      this.doHandle(message);
    }).bind(this), 1000);
    return;
  }
  this.doHandle(message);
}

// Check a type of next message and work with it
Bot.prototype.doHandle = function (message) {
  switch (message.input.type) {
    case 'text':
      this.hadleText();
      break;
    case 'date_roll':
      this.handleDateRoll(message)
      break;
    case 'time_roll':
      this.handleTimeRoll(message);
      break;
    case 'bye':
      this.handleBye();
      break;
    default:
      console.log(message.input.type + ' is incorrect type of the input');
  }
  this.props.inputMessage.currentMessage = message;
  message.text && message.text.length && this.appendMessage(helper.getChatItem(message.text));
}

// Handle for messages with type = text
Bot.prototype.hadleText = function () {
  this.setDisableInputMessage(false, this.placeholders.type_here)
}

// Handle for messages with type = date_roll
Bot.prototype.handleDateRoll = function (message) {
  this.handleRoll('date', message);
}

// Handle for messages with type = time_roll
Bot.prototype.handleTimeRoll = function (message) {
  this.handleRoll('time', message);
}

// Common function for messages with type = xxx_roll
Bot.prototype.handleRoll = function (func, message) {
  let min = message.input.args && message.input.args.min ? message.input.args.min : undefined;
  let max = message.input.args && message.input.args.max ? message.input.args.max : undefined;
  let roll = helper.getRollProps(message.input.type, min, max);
  this.rollInput.mobiscroll()[func](roll);
  this.rollInputChange();
  this.props.snack.append(this.rollInput);
  this.setUiType(message.input.type);
  this.setDisableInputMessage(true, this.placeholders.choose);
}

// Set disable/enable for user's text input
Bot.prototype.setDisableInputMessage = function (is_disable, placeholder) {
  this.props.inputMessage.prop("disabled", is_disable);
  this.props.inputMessage.attr('placeholder', placeholder);
}

// Set attr type to show or hide snack elements
Bot.prototype.setUiType = function (type) {
  if (!type.length) this.props.snack.html('');
  this.props.inputContainter.attr('type', type);
  this.props.snack.attr('type', type);
}

// Handle to "bye" with the processing the answers
Bot.prototype.handleBye = function () {
  this.props.chatArea.addClass('bye');
  console.log(this.answers);
}
