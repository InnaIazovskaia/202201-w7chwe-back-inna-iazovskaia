const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  friends: {
    type: [Schema.Types.ObjectId],
    ref: "User",
  },
  enemies: {
    type: [Schema.Types.ObjectId],
    ref: "User",
  },
});

const User = model("User", UserSchema, "users");

module.exports = User;
