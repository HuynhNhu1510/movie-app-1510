const express = require("express");
const dotenv = require("dotenv");
const body_parser = require("body-parser");

const connectDB = require("./db/connect_db");
const authRoute = require("./routes/auth.route");
const listRoute = require("./routes/list.route");

const app = express();
express.urlencoded({ extended: true });

app.use(body_parser.json());
app.use(express.json());

// get var from .env file
dotenv.config();  

const PORT = process.env.PORT || 3000;


// route -  authentication
app.use("/api", authRoute);

// route - list
app.use("/api/list", listRoute);


connectDB();
app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  }
    console.log(`SERVER IS RUNNING AT PORT ${PORT}`);
});
