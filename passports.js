const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const { JWT_SECRET } = require("./config/config");
const GooglePlusTokenStrategy = require("passport-google-plus-token");

const User = require("./models/User");

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("Authorization"),
      secretOrKey: JWT_SECRET,
    },
    async (payload, done) => {
      try {
        const user = await User.findById(payload.sub);
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

// google oauth stratagey

passport.use(
  "googleToken",
  new GooglePlusTokenStrategy(
    {
      clientID:
        "399788636327-5v1491na1eaj69ou453v0r7bm8tp2ajt.apps.googleusercontent.com",
      clientSecret: "PnOy1u0863ltxxJEhgPO9Lva",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("accessToken", accessToken);
        console.log("refreshToken", refreshToken);
        console.log("profile", profile);

        const user = await User.findOne({ "google.id": profile.id });
        if (user) {
          console.log("user already exist");
          return done(null, user);
        }

        const newUser = new User({
          method: "google",
          google: {
            id: profile.id,
            email: profile.emails[0].value,
          },
        });
        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
);
