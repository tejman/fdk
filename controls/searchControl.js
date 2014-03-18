// Generated by CoffeeScript 1.7.1
(function() {
  var async, financeDataModel, schoolDataModel;

  schoolDataModel = require("../models/schoolModel.js");

  financeDataModel = require("../models/financeModel.js");

  async = require("async");

  module.exports = {
    getRandomSchools: function(req, res) {
      var count, schools, _results;
      schools = [];
      count = 0;
      _results = [];
      while (count < 3) {
        count++;
        _results.push(schoolDataModel.getRandomDoc(function(err, result) {
          schools.push(result);
          if (schools.length === 3) {
            return res.send({
              schools: schools
            });
          }
        }));
      }
      return _results;
    },
    search: function(req, res) {
      var input;
      input = req.query.input === "{All}" ? {} : {
        name: new RegExp(req.query.input, "i")
      };
      console.log(input);
      return schoolDataModel.find(input, function(err, results) {
        var fullResults;
        fullResults = [];
        return async.forEach(results, function(result, cb) {
          return financeDataModel.findOne({
            zip: result.zip
          }, function(err, doc) {
            var JSONresult;
            JSONresult = result.toJSON({
              virtuals: true
            });
            JSONresult.zipProfile = doc === null ? {} : doc.toJSON({
              virtuals: true
            });
            fullResults.push(JSONresult);
            if (err) {
              return cb(err);
            } else {
              return cb();
            }
          });
        }, function(err) {
          if (err) {
            console.log(err);
          }
          return res.send({
            schools: fullResults,
            query: req.query.input
          });
        });
      });
    }
  };

}).call(this);
