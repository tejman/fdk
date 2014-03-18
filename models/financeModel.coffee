mongoose = require "mongoose"

financeDataSchema = new mongoose.Schema({
  zip: String,
  unemployed: String,
  households: String,
  inc10: String,
  inc15: String,
  inc25: String,
  inc35: String,
  inc50: String,
  inc75: String,
  inc100: String,
  inc150: String,
  inc200: String,
  inc201: String,
  medianIncome: String,
  meanIncome: String,
  ssi: String,
  cpa: String,
  snap: String,
  capitaIncome: String,
  poverty: String
  })
financeDataSchema.virtual("snapPercent").get ()->
  return Math.round((parseInt(this.snap)/parseInt(this.households))*100*10)/10

financeDataSchema.virtual("ssiPercent").get ()->
  return parseInt(this.ssi)/parseInt(this.households)

financeDataSchema.virtual("cpaPercent").get ()->
  return parseInt(this.cpa)/parseInt(this.households)


financeDataModel = module.exports = mongoose.model("finance", financeDataSchema)