// Generated by CoffeeScript 1.7.1
(function() {
  var financeDataModel, schoolDataModel, userModel;

  schoolDataModel = require("../models/schoolModel.js");

  userModel = require("../models/userModel.js");

  financeDataModel = require("../models/financeModel.js");

  module.exports = {
    profile: function(req, res) {
      return userModel.findOne({
        _schoolId: req.params.id
      }, function(err, result) {
        if (err) {
          return console.log(err);
        } else {
          return schoolDataModel.findById(req.params.id, function(err, doc) {
            var JSONdoc;
            JSONdoc = doc.toJSON({
              virtuals: true
            });
            console.log(JSONdoc);
            return res.render("schoolAdmin", {
              school: JSONdoc,
              userSchool: result ? result.profile : null
            });
          });
        }
      });
    }
  };

}).call(this);
