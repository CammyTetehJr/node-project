const express = require("express");
const app = express();
const xmlparser = require('express-xml-bodyparser');
app.use(xmlparser());
const helper = require('./helper');


var port = 3000;
app.listen(port, () => {
	console.log("server running on http://localhost:" + port);
});

//Home Message
app.get("/", (req, res) => {
  res.json({ status: "success", message: "Welcome To vestigingen2020 API" });
});

//Query saved data
app.get('/query', (req, res, next) => {
helper.querySavedData(res);
});

//Receive xml data on demand
app.post('/receive-xml',(req, res, next) => {
  helper.receiveXml(req,res);
});

module.exports = app;


