schoolDataModel = require "../models/schoolModel.js"
financeDataModel = require "../models/financeModel.js"


module.exports = {

  index: (req, res)->
    res.render "index", {title: "Feed Dem Kids"}

  ,profile: (req, res) ->
    schoolDataModel.findById req.params.id, (err, doc)->
      financeDataModel.findOne {zip: doc.zip}, (err, result)->
        if err
          res.send err
        console.log result.snapPercent
        res.render "school-profile", {school: doc, finance: result}

  ,find: (req, res) ->
    res.render "find"

  ,getRandomSchools: (req,res)->
    schools = []
    count=0
    while count < 3
      count++
      schoolDataModel.getRandomDoc (err, result)->
        schools.push(result)

        if schools.length is 3
          res.send {schools: schools}

  ,search: (req, res)->

    schoolDataModel.find {name: new RegExp(req.query.input, "i")}, (err, results)->
      res.send(schools: results, query: req.query.input)

  };

