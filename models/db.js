const mongoose = require("mongoose");

const dbURL = "mongodb://localhost:27017/myChat"

const connectDB = async() => {
    try {
       await mongoose.connect(dbURL,{
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: true,
            useUnifiedTopology: true
       })
       console.log("connected to mongoDB");    
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
    
} 

module.exports = connectDB