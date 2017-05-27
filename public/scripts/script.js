$(document).ready(function() {
  $('#testing').on('click', function() {
    $('body').append('<h1>Working</h1>');
    $('#testing').hide();
  });
});
