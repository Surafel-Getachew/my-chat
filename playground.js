const Message = require("./models/Message");

const findMessages = async () => {
    const msg = await Message.find();
    console.log(msg.text)
}

findMessages();