const router = require("express").Router();
const Channel = require("../models/Channel");


// router.get("/",(req,res) => {
//     res.send("mychat channel working");
// });

router.get("/",async (req,res) => {
   const channels = await Channel.find();
   res.send(channels);
})

router.post("/",async(req,res) => {
    
    const {name,info} = req.body;
    
    const channel = new Channel({
        name,
        info
    })

    await channel.save();

    res.send(channel);

})


module.exports = router;