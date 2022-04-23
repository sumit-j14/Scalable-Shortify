const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser');
const main_function = require('./middlwares/mainHandle.js')
const has_shortURL_Access= require('./access/access.js')
require('dotenv').config()
const port = process.env.port || 3000

//middlewares
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//first display page
app.get('/',function(req, res) {
  res.sendFile(path.join(__dirname,'/public/' ,'/index.html'));
});

//long url to short url
app.post('/shorten',urlencodedParser,function(req, res) {
  let longURL= req.body.long_url;
  main_function(longURL);
  res.sendFile(path.join(__dirname,'/public/' ,'/index.html'));
});

//short url to longurl
app.get('/access',urlencodedParser,function(req, res) {
  let shortURL = req.query.short_url
  console.log("searching "+shortURL);
  has_shortURL_Access(shortURL)
  
  res.sendFile(path.join(__dirname,'/public/' ,'/index.html'));
});

//spin up express server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})