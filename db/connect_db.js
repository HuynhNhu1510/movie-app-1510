const mongoose = require("mongoose");

const connectDB = async() => {
    const connect = await mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log("Database is connected");
    }).catch((error) => {
        console.log(error);
    });
}

module.exports = connectDB;


