require("dotenv").config();
const express = require("express");

const userRoutes = require("./routes/user");
const transactionRoutes = require("./routes/transaction")

const app = express(); // Initialising the app

app.use(express.json()); // JSON Parsing

app.use("/api/v1/user", userRoutes)
app.use("/api/v1/transaction", transactionRoutes)

app.get("/", (req, res) => {
  res.send("KoinX Internship Assignment");
});



const port = process.env.PORT || 3000; // Defining port

app.listen(port, console.log(`Listening at port ${port}`)); // server listining on specified port
