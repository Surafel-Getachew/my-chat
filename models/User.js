const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    channelName:{
        type:String,
    },
    socketid:{
        type:String
    }
})

module.exports = mongoose.model("user", userSchema);
