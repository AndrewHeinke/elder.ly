// main js will go here
$(document).ready(function() {
  // user type button click events on sign up form page
  $('#usrBtn').on('click', function() {
    selectItemByValue(userType, 'member');

    $('#userType-display').html("<p id='user-type-text' name='userType'>Elderly Member</p>" + "<p id='user-type-description'>Members can request assistance from volunteers. Older seniors can receive help running errands or completing simple tasks.</p>");
  });
  $('#volunteerBtn').on('click', function() {
    selectItemByValue(userType, 'volunteer');

    $('#userType-display').html("<p id='user-type-text' name='userType'>Volunteer</p>" + "<p id='user-type-description'>Volunteers assist independent elderly people who need help running errands and completing simple tasks.</p>");
  });

  // when user presses button on sign up form it will select different value option in user type drop down menu
  function selectItemByValue(elmnt, value) {
    for (var i = 0; i < elmnt.options.length; i++) {
      if (elmnt.options[i].value == value)
        elmnt.selectedIndex = i;
    }
  }


  // auto resize text area
  var observe;
  if (window.attachEvent) {
    observe = function(element, event, handler) {
      element.attachEvent('on' + event, handler);
    };
  } else {
    observe = function(element, event, handler) {
      element.addEventListener(event, handler, false);
    };
  }

  var text = document.getElementById('text');
  var length = [];

  function resize() {

    if (length.length < 2) {
      length.push(text.value.length);
    } else {
      length.shift();
      length.push(text.value.length);
    }

    if (text.scrollHeight - 30 >= 180 && length[0] < length[1]) {
      text.style.height = '180px';
      text.scrollTop = text.scrollHeight;
    } else {
      text.style.height = 'auto';
      text.style.height = text.scrollHeight - 30 + 'px';
    }
  }

  function delayedResize() {
    window.setTimeout(resize, 0);
  }

  observe(text, 'change', resize);
  observe(text, 'cut', delayedResize);
  observe(text, 'paste', delayedResize);
  observe(text, 'drop', delayedResize);
  observe(text, 'keydown', delayedResize);


});
