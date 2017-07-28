;(function($) {
  var message = Message();

  message.create({
    _class: 'message--error',
    header: 'Head',
    body: 'Body',
  }).open();

})(jQuery);
