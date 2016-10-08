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
});
