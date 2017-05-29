//request object to be sent to server
var requestObject = {
  //current readout of display
  currentValue: '',
  //memory value
  memoryValue: '',
  //opperation type
  type: ''
};

//document on ready function
$(document).ready(function() {

  //number button on click
  $('.numberButton').on('click', function() {
    requestObject.currentValue += $(this).text();
    updateDisplay();
  }); //end number button on click

  //clear button on click
  $('.clearButton').on('click', function() {
    //on second click, memory value is cleared
    if (requestObject.currentValue === '') {
      requestObject.memoryValue = '';
    }
    //clear current value and update display
    requestObject.currentValue = '';
    updateDisplay();
    //deselect opperator
    $('.opperatorButton').removeClass('active');
    requestObject.type = '';
  }); //end clear button

  //equals button on click
  $('.equalButton').on('click', function() {
    //check if both fields are populated
    if (requestObject.currentValue !== '' && requestObject.memoryValue !== '') {
      $.ajax({
        type: 'POST',
        url: '/getResult',
        data: requestObject,
        success: function(response) {
          //set the current value of the request object to result and update display
          requestObject.currentValue = response.result;
          updateDisplay();
        } //end success function
      }); //end ajax
    } else {
      //tell user they can't run calculation without two values
      $('.equalButton').text('x');
      setTimeout(function() {
        $('.equalButton').text('=');
      }, 300);
    } //end check if fields are populated

  }); //end equals on click

  //opperator functions
  $('.opperatorButton').on('click', function() {
    //add class to selected opperator and remove from all others
    //change type in request object
    $('.opperatorButton').removeClass('active');
    requestObject.type = $(this).text();
    $(this).addClass('active');
    //set memory to current and clear current
    requestObject.memoryValue = requestObject.currentValue;
    requestObject.currentValue = '';
    updateDisplay();
  }); //end opperator on click
}); //end document ready

//updates display for current number
function updateDisplay() {
  $('#display').val(requestObject.currentValue);
} //end update display
