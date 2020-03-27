const path = require('path');
const express = require('express');
const port=process.env.PORT || 8080
const app = express();

// app.use(express.static(path.join(__dirname, 'dist')));

app.use(express.static(__dirname,'dist'))

app.use('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'index.html'))
})
//app.set('port', process.env.PORT || 8080);

// var server = app.listen(app.get('port'), function() {
//   console.log('listening on port ', server.address().port);
// });

app.listen(port);
console.log("server started")