var showText = function (target, message, index, interval) {
  if (index < message.length) {
    $(target).append(message[index++]);
    setTimeout(function () { showText(target, message, index, interval); }, interval);
  }
};

$(function () {

  showText("#msg", "I'm an aspiring Web Designer & Deveoper from India, living in the beautiful city of Guwahati, Assam. I create things with code and then turn them into useful, useable, responsive & database-driven websites. I'm a coder with an Engineering background, a Football fanatic with Real Madrid in heart, a true 'MADRIDISTA'.", 0, 25);

});



AOS.init({
  duration: 1200,
});
