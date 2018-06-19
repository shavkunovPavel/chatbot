;
(function (window) {
    if (window.helper) return;

    var Helper = function () {
    }

    // Return a markup for chat's item
    Helper.prototype.getChatItem = function (text) {
      return '\
      <li class="message col-xs-9 pull-left">\
        <div class="messageBody ui-chatbox-msg alert chat-bubble user-chat-bubble padding-no-margin pull-left text-bubble">\
          <span class="text-span">' + text + '</span>\
        </div>\
      </li>';
    }

    // Return a markup for users's answer item
    Helper.prototype.getAnswerItem = function (text) {
      return '\
      <li class="message col-xs-9 pull-right">\
        <div class="messageBody sent-message ui-chatbox-msg alert chat-bubble my-chat-bubble padding-no-margin pull-right">\
          <span>' + text + '</span>\
        </div>\
      </li>';
    }

    // Return a markup for preview item
    Helper.prototype.getEmptyItem = function () {
      return '\
      <li class="message col-xs-9 pull-left">\
        <div class="messageBody ui-chatbox-msg alert chat-bubble empty user-chat-bubble padding-no-margin pull-left text-bubble">\
          <span class="text-span empty">Chat is typing...</span>\
        </div>\
      </li>';
    }

    // Return an object for roll element
    Helper.prototype.getRoll = function () {
      return {
        theme: "ios-dark",
        display: "inline",
        mode: "scroller",
        showLabel: false,
      };
    }

    // Return an object for date roll element
    Helper.prototype.getDateRollProps = function (min, max) {
      let roll = this.getRoll();
      roll.dateFormat = "dd-M-yy";
      if (min) roll.min = new Date(min);
      if (max) roll.max = new Date(max);
      return roll;
    }

    // Return an object for time roll element
    Helper.prototype.getTimeRollProps = function (min, max) {
      let roll = this.getRoll();
      roll.timeFormat = "HH:ii";
      if (min) roll.min = new Date(new Date().setHours(min.slice(0, 2), min.slice(-2), 0, 0));
      if (max) roll.max = new Date(new Date().setHours(max.slice(0, 2), max.slice(-2), 0, 0));
      return roll;
    }

    // Common function to return roll options
    Helper.prototype.getRollProps = function (type, min, max) {
      switch (type) {
        case 'date_roll':
          return this.getDateRollProps(min, max);
        case 'time_roll':
          return this.getTimeRollProps(min, max);
      }
    }


    window.helper = new Helper();
})(window);