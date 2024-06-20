require("dotenv").config();
const mongoose = require("mongoose");

const uri = process.env.SERVER_MONGODB_URI;

const connectDB = async () => {
    try {
       await mongoose.connect(uri);//connect to mongodb
       console.log(" Success, connected to MongoDB")//display log message 
    } catch (error) {
        console.log("hey dude mongodb error:", error.message);
    }
}
module.exports = connectDB;