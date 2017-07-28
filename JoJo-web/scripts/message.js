;(function(root, factory) {
  'use strict';

  if (typeof exports === 'object') {

    // CommonJS module
    // Load jQuery as a dependency
    var jQuery;
    try {jQuery = require('jquery'); } catch (e) {}

    module.exports = factory(jQuery);
  } else {
    root.Message = factory(root.jQuery);
  }
}

(this, function($) {
  'use strict';

  // the message el
  function messageEl() {
    return $('<div class="message"> <div class="message__header"></div> <div class="message__close">&times</div> <div class="message__body"> </div> </div>');
  }

  var addListners = function addListners() {
    var $close = this.$el.find('.message__close');

    $close.off('click');
    $close.on('click', this.close.bind(this));
  };

  var closeNow = function closeNow() {
    this.$el.removeClass('is-active');
    this.isOpen = false;
  };

  var messageObj = {
    isOpen: false,

    create: function(options) {
      this.options = $.extend({}, DEFAULTS, options);
      addListners.call(this);
      this.clean();

      this.$el.addClass(this.options._class);
      this.$el.find('.message__header').html(this.options.header);
      this.$el.find('.message__body').html(this.options.body);

      return this;
    },

    open: function() {
      if (!this.isOpen) {
        this.$el.addClass('is-active');
        this.isOpen = true;
      }

      return this;
    },

    close: function(ms) {
      if (!this.isOpen)
      return;

      var _this = this;

      if (ms) {
        setTimeout(function() {
          closeNow.call(_this);
        }, ms);
      } else {
        closeNow.call(_this);
      }

      return this;
    },

    clean: function() {
      this.$el.attr('class', 'message');
    },
  };

  /**
   * return the same modal instance
   */
  var getInstance = function() {
    if (typeof messageObj.$el === 'undefined') {
      messageObj.$el = messageEl();
      $('body').append(messageObj.$el);
    }

    return messageObj;
  };

  /**
   * Message Constructor function
   * @param {Object} options - message options
   */
  var Message =  function() {

    return getInstance();
  };

  // Defaults
  var DEFAULTS = {
    _class: '',
    header: 'Message head',
    body: 'Message Body',
  };

  return Message;
}));
