var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var router = require('./router/main')(app);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static('views'));

server.listen(80, function() {
  console.log('Express server listening on port ' + server.address().port);
});
