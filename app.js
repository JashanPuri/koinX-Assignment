require("dotenv").config();
const express = require("express");
const swaggerUI = require("swagger-ui-express");

const connectDB = require("./db/connect"); // connect to db
const swaggerDocument = require("./swagger.json"); // api docs

// routes
const userRoutes = require("./routes/user");
const transactionRoutes = require("./routes/transaction");

// error handlers
const notFoundMiddleware = require("./middleware/not-found"); // route not found
const errorHandlerMiddleware = require("./middleware/error-handler"); // error handling

const fetchAndUpdateEthereumPriceJob = require('./services/ethereum-price')

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

app.get("/", (req, res) => {
  res.send("KoinX Internship Assignment");
});

// api documentation
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/transaction", transactionRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000; // Defining port

const start = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    // connect to mongo db
    await connectDB(mongoURI);

    // listen to requests
    app.listen(port, () => {
      console.log(`Listening at port ${port}`);
      fetchAndUpdateEthereumPriceJob()
    });
  } catch (error) {
    console.log(error);
  }
};

start();
