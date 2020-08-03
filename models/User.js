const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema({
    method: {
      type: String,
      enum: ["local","google", "facebook"],
    },

    local: {
      email: {
        type: String,
      },
      password: {
        type: String,
      },
    },

    google: {
      id: {
        type: String,
      },
      email: {
        type: String,
        lowercase: true,
      },
    },

    facebook: {
      id: {
        type: String,
      },
      email: {
        type: String,
        lowercase: true,
      },
    },
    avatar:{
      type:Buffer
    }
});

userSchema.pre("save", async function (next) {

  if(this.method !== "local"){
    next();
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.local.password, salt);
  this.local.password = hashedPassword;
  next();
});



userSchema.methods.isValidPassword = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.local.password);
  } catch (error) {
    throw new Error(error);
  }
};

const User = mongoose.model("user", userSchema);

module.exports = User;
