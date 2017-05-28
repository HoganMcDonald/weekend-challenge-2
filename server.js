//requires
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

//uses
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

//listening
app.listen(3000, function() {
  console.log('server up at 3000');
});

//get path
app.get('/', function(req, res) {
  res.sendFile(path.resolve('views/index.html'));
});

//functions
app.post('/getResult', function(req, res) {
  console.log(req.body);
  var responseObject = {
    result: math(req.body)
  };
  res.send(responseObject);
});

function math(requestObject) {
  switch (requestObject.type) {
    case '+':
      return Number(requestObject.input1) + Number(requestObject.input2);
    case '-':
      return Number(requestObject.input1) - Number(requestObject.input2);
    case '/':
      return Number(requestObject.input1) / Number(requestObject.input2);
    case 'x':
      return Number(requestObject.input1) * Number(requestObject.input2);
    default:
      break;
  }
}
