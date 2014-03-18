// Generated by CoffeeScript 1.7.1
(function() {
  var async, financeDataModel, mongoose, schoolDataModel, schoolDataSchema, simpleStats;

  mongoose = require("mongoose");

  async = require("async");

  financeDataModel = require("./financeModel.js");

  simpleStats = require("simple-statistics");

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
  });

  schoolDataSchema.virtual("grades").get(function() {
    var high, low;
    low = isNaN(+this.lowGrade[0]) ? 0 : +this.lowGrade[0];
    high = isNaN(+this.highGrade[0]) ? 0 : +this.highGrade[0];
    return {
      low: low,
      high: high
    };
  });

  schoolDataSchema.virtual("diversity").get(function() {
    var coll, ethnic, ethnicValues;
    coll = this;
    ethnic = [coll.nativeAmerican, coll.asian, coll.hispanic, coll.black, coll.pacificIsland, coll.multiRacial, coll.white];
    ethnicValues = ethnic.map(function(item) {
      return (+item) / (+coll.enrollment);
    });
    return simpleStats.standard_deviation(ethnicValues) * 100;
  });

  schoolDataSchema.statics.getAllStates = function(done) {
    var coll;
    coll = this;
    return coll.find().distinct("stateFull", function(err, results) {
      var getAbbr, taskArray;
      getAbbr = function(doc, cb) {
        return coll.findOne({
          "stateFull": doc
        }, function(err, result) {
          console.log(err);
          return cb(err, {
            "stateFull": result.stateFull,
            "stateAbbr": result.stateAbbr
          });
        });
      };
      taskArray = results.map(function(item) {
        return function(cb) {
          return getAbbr(item, cb);
        };
      });
      return async.series(taskArray, function(err, results) {
        return done(err, results);
      });
    });
  };

  schoolDataSchema.statics.getRandomDoc = function(done) {
    var coll;
    coll = this;
    return coll.count(function(err, count) {
      var rand;
      if (err) {
        done(err);
      }
      rand = Math.floor(Math.random() * count);
      return coll.findOne().skip(rand).exec(done);
    });
  };

  schoolDataModel = module.exports = mongoose.model("school", schoolDataSchema);

}).call(this);