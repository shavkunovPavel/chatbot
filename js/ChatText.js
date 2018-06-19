;
(function (window) {
    if (window.chatText) return;

    var ChatText = function () {
      this.currentMessage = 0;
      this.messages = this.getMessages();
    }

    // Return messages for the chat
    ChatText.prototype.getMessages = function () {
      return [
        {
          id: 0,
          text: 'Hello',
          input:{
            type: 'text'
          }
        },
        {
          id: 1,
          text: 'Tell me your date of birth',
          input: {
            type: 'date_roll',
            args: {
              min:  '1979-07-20',
              max: '1979-07-25'
            }
          }
        },
        {
          id: 2,
          text: 'Please select the date and time for your appointment',
          input: {
            type: 'date_roll',
            args: {
              min: '2018-06-01',
              max: '2018-06-31',
            }
          }
        },
        {
          id: 2,
          input: {
            type: 'time_roll',
            args: {
              min: '0900',
              max: '2000'
            }
          }
        },
        {
          id: 3,
          text: 'What time of the day are you usually free?',
          input: {
            type: 'time_roll',
            args: {
              min: '1800',
              max: '2359'
            }
          }
        },
        {
          id: 4,
          text: 'From which to which dates are you going on the holiday?',
          input: {
            type: 'date_roll',
            args: {
              min: '2018-06-19'
            }
          }
        },
        {
          id: 4,
          input: {
            type: 'date_roll',
            args: {
              min: '2018-06-19'
            }
          }
        },
        {
          text: 'Thank You!',
          input: {
            type: 'bye'
          }
        }
      ]
    }


    // Get a next message
    ChatText.prototype.nextMessage = function () {
      return this.messages[this.currentMessage++];
    }

    window.chatText = new ChatText();
})(window);