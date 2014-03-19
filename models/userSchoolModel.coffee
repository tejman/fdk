mongoose = require "mongoose"
async = require "async"
schoolDataModel = require "./schoolModel.js"

accountSchema = new mongoose.Schema({
  accountId: String,
  balance: String
})

userSchoolSchema = new mongoose.Schema({
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
  asstLunchCost: String,
  _schoolId: mongoose.Schema.Types.ObjectId
})



userSchoolModel = module.exports = mongoose.model("userschool", userSchoolSchema)

