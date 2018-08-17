var express = require('express');

var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var path = require('path');

app.use(express.static(__dirname + '/client/public/dist/public'));

//Add new database for each different project
var db_url = 'mongodb://localhost:27017/Restaurants'

require('./server/config/mongoose.js')(db_url);

require('./server/config/routes.js')(app)

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./client/public/dist/public/index.html"))
  });

app.listen(8000, function() {
    console.log("listening on port 8000");
})