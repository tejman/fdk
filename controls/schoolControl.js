// Generated by CoffeeScript 1.7.1
(function() {
  var schoolDataModel;

  schoolDataModel = require("../models/schoolModel.js");

  module.exports = {
    popStateDropdown: function(req, res) {
      return schoolDataModel.getAllStates(function(err, results) {
        return res.send(results);
      });
    }
  };

}).call(this);
