mongoose = require "mongoose"
async = require "async"

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

