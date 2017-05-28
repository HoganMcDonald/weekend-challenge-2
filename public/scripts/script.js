$(document).ready(function() {
  //click funciton for opperator buttons
  $('.opperatorButton').on('click', function() {
    //request object to be sent to the server
    var requestObject = {
      input1: $('#value1').val(),
      input2: $('#value2').val(),
      type: $(this).text()
    };
    //clear input fields
    $('input').val('');
    console.log(requestObject);
    //ajax send inputs and type get result
    $.ajax({
      type: 'POST',
      url: '/getResult',
      data: requestObject,
      //display results on success
      success: function(response) {
        console.log(response);
        //display the results
        $('#output').val(response.result);
      } //end success function
    }); //end ajax
  }); //end click function - opperator buttons
  //on click for clear button
  $('.clearButton').on('click', function() {
    $('#value1').val('');
    $('#value2').val('');
    $('#output').val('');
  }); //end clear
}); //end document ready

function checkInput() {
  if ($('#value1').val() === '') {
    return $('#output').val();
  } else {
    return $('#value1').val();
  }
}
