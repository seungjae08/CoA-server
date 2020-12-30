const express = require("express");
const https = require("https");
const http = require("http")
const fs = require("fs")

const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser');
const route = require("./route");
const cors = require("cors");
const app = express();


app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors({
  origin: true,
  methods: ["GET", "POST"],
  credentials: true
}));


app.use('/', route);

app.listen(8080)
// http.createServer(app).listen(8000);
// https.createServer({
//   key : fs.readFileSync("./cert.key"),
//   cert : fs.readFileSync("./cert.crt")
// },app).listen(8000);