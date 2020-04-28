const mongoose = require("mongoose");

const ChannelSchema = mongoose.Schema({
    name:{
        type:String,
    },
    info:{
        type:String
    }
});


module.exports = mongoose.model("channel",ChannelSchema);