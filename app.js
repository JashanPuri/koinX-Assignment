require("dotenv").config();
const express = require("express");

const app = express(); // Initialising the app

app.use(express.json()); // JSON Parsing

app.use("/", (req, res) => {
  res.send("KoinX Internship Assignment");
});

const port = process.env.PORT || 3000; // Defining port

app.listen(port, console.log(`Listening at port ${port}`)); // server listining on specified port
