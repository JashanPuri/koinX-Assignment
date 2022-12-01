require("dotenv").config();
const express = require("express");

const userRoutes = require("./routes/user");
const transactionRoutes = require("./routes/transaction");

const app = express(); // Initialising the app

app.use((req, res, next) => {
  // SETTING UP CORS HEADERS (CROSS ORIGIN RESOURCE SHARING)

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});

app.use(express.json()); // JSON Parsing

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/transaction", transactionRoutes);

app.get("/", (req, res) => {
  res.send("KoinX Internship Assignment");
});

const port = process.env.PORT || 3000; // Defining port

app.listen(port, console.log(`Listening at port ${port}`)); // server listining on specified port
