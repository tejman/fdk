mongoose = require "mongoose"

accountSchema = new mongoose.Schema({
  accountId: String,
  balance: String
})

userProfileSchema = new mongoose.Schema({
  contactName: String,
  contactPhone: String,
  contactEmail: String,
  mailAddress: String,
  mailCity: String,
  mailZip: String,
  bankName: String,
  bankRouting: String,
  bankState: String,
  bankCountry: String,
  bankAcct: String,
  bankAcctContact: String,
  profImage: String,
  lunchAccounts: [accountSchema],
  balance: String,
  stdLunchCost: String,
  asstLunchCost: String
})


userSchema = new mongoose.Schema {
  userid: String,
  username: String,
  userType: String,
  profile: [userProfileSchema],
  _schoolId: mongoose.Schema.Types.ObjectId
  
}

UserModel = module.exports = mongoose.model "user", userSchema