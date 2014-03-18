mongoose = require "mongoose"
async = require "async"
financeDataModel = require "./financeModel.js"
simpleStats = require "simple-statistics"

schoolDataSchema = new mongoose.Schema({
  name: String,
  stateFull: String,
  stateAbbr: String,
  schoolId: String,
  agencyName: String,
  agencyId: String,
  county: String,
  address: String,
  city: String,
  zip: String,
  mailAddress: String,
  mailCity: String,
  mailZip: String,
  phone: String,
  type: String,
  charter: String,
  magnet: String,
  lat: String,
  lng: String,
  stateSchoolId: String,
  lowGrade: String,
  highGrade: String,
  level: String,
  enrollment: String,
  freeLunch: String,
  redLunch: String,
  totalFreeLunch: String,
  nativeAmerican: String,
  asian: String,
  hispanic: String,
  black: String,
  white: String,
  pacificIsland: String,
  multiRacial: String,
  ratio: String
  })
schoolDataSchema.virtual("grades").get ()->
  
  low = if isNaN(+this.lowGrade[0]) then 0 else +this.lowGrade[0]
  high = if isNaN(+this.highGrade[0]) then 0 else +this.highGrade[0]
  {low: low, high: high}

schoolDataSchema.virtual("diversity").get ()->
  coll = this
  ethnic = [coll.nativeAmerican, coll.asian, coll.hispanic, coll.black, coll.pacificIsland, coll.multiRacial, coll.white]
  ethnicValues = ethnic.map (item)->
    (+item)/(+coll.enrollment)
  simpleStats.standard_deviation(ethnicValues)*100

schoolDataSchema.statics.getAllStates = (done)->
  coll = this

  coll.find().distinct "stateFull", (err, results)->
    getAbbr = (doc, cb)->
      coll.findOne {"stateFull": doc}, (err, result)->
        console.log err
        cb  err, {"stateFull": result.stateFull, "stateAbbr": result.stateAbbr}

    taskArray = results.map (item)->
      (cb)->
        getAbbr item, cb

    async.series taskArray, (err, results)->
      done(err, results)

schoolDataSchema.statics.getRandomDoc = (done)->
  coll = this
  coll.count (err,count)->
    if err
      done(err)
    rand = Math.floor Math.random()*count
    coll.findOne().skip(rand).exec done



schoolDataModel = module.exports = mongoose.model("school", schoolDataSchema)

