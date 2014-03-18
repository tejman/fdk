mongoose = require "mongoose"

userSchema = new mongoose.Schema {
  userid: String,
  username: String,
  userType: String,
  school: String,
  profile: Object
}

UserModel = module.exports = mongoose.model "user", userSchema