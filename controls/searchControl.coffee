schoolDataModel = require "../models/schoolModel.js"
financeDataModel = require "../models/financeModel.js"
async = require "async"

module.exports = {

  getRandomSchools: (req,res)->
    schools = []
    count=0
    while count < 3
      count++
      schoolDataModel.getRandomDoc (err, result)->
        schools.push(result)
        if schools.length is 3
          res.send {schools: schools}

  ,search: (req, res)->
    input = if req.query.input is "{All}" then {} else {name: new RegExp(req.query.input, "i")}

    console.log input
    schoolDataModel.find(input).sort({"name": 1}).limit(500).exec (err, results)->
      fullResults = []

      async.forEach(results, (result, cb)->
        financeDataModel.findOne {zip: result.zip}, (err, doc)->
          JSONresult = result.toJSON({virtuals: true})
          JSONresult.zipProfile = if doc is null then {} else doc.toJSON({virtuals: true})
          fullResults.push(JSONresult)
          if err then cb err else cb()

      ,(err)->
        if err then console.log err
        res.send(schools: fullResults, query: req.query.input)
      )
}