var mongoose = require("mongoose");
var csv = require("csv-to-json");

var schoolDataSchema = new mongoose.Schema({

});

var schoolDataModel = module.exports = mongoose.model("schoolData", schoolDataSchema);

var json = csv.parse("./data/school-data.csv");
csv.write("./data/json/school-data.json");