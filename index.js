const express = require("express");
const dotenv = require("dotenv");
const body_parser = require("body-parser");

const connectDB = require("./db/connect_db");
const authRoute = require("./routes/auth.route");

const app = express();
app.use(body_parser.json());
app.use(express.json());

const PORT = process.env.PORT || 3000;


// get var from .env file
dotenv.config();  

 
// route -  authentication
app.use("/api", authRoute);




connectDB();
app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  }
    console.log("SERVER IS RUNNING AT PORT 3000");
});
