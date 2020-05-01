const router = require("express").Router();
const passport = require("passport");
const JWT = require("jsonwebtoken");


const passportConfig = require("../passportConfig");
const User = require("../models/User");
const { JWT_SECRET } = require("../config/config");

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

module.exports = router;
