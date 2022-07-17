const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
    },
    number: {
      type: String,
    },
  },
  { versionKey: false }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
