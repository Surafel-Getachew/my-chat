const router = require("express").Router();
const passport = require("passport");
const JWT = require("jsonwebtoken");
const multer = require("multer");

const passportConfig = require("../passportConfig");
const User = require("../models/User");
const { JWT_SECRET } = require("../config/config");
const { response } = require("express");

const signToken = (user) => {
  return JWT.sign(
    {
      iss: "my-chat",
      sub: user._id,
      iat: new Date().getTime(),
    },
    JWT_SECRET
  );
};

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ "local.email": email });

  if (user) {
    res.status(403).json({ error: "Email already in use" });
  }

  const newUser = new User({
    method: "local",
    local: {
      email: email,
      password: password,
    },
  });

  const token = signToken(newUser);
  newUser.token = token;
  await newUser.save();

  res.status(200).json({ token });
});

router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    const token = signToken(req.user);
    res.status(200).json({ token });
  }
);

router.post(
  "/google",
  passport.authenticate("googleToken", { session: false }),
  (req, res) => {
    const token = signToken(req.user);
    res.status(200).json({ token });
  }
);

router.post("/facebook",passport.authenticate("facebookToken",{session:false}),(req,res) => {
  const token = signToken(req.user);
  res.status(200).json({token})
})

router.get(
  "/secret",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send("test");
  }
);

router.get("/", passport.authenticate("jwt", { session: false }),(req,res) => {
  res.json(req.user);
});

// get all the users

router.get("/all" ,async (req,res) => {
  const users = await User.find({});
  res.json(users);
})

const upload = multer ({
  
})

router.post(
  "/avatar",
  passport.authenticate("jwt", { session: false }),
  upload.single("avatar"),
  async (req, res) => {
    req.user.avatar=req.file.buffer
    await req.user.save();
    console.log(req.user.avatar)
    res.send(req.user);
  }
);





module.exports = router;
