schoolDataModel = require "../models/schoolModel.js"
financeDataModel = require "../models/financeModel.js"


module.exports = {

  index: (req, res)->
    res.render "index", {title: "T4T"}

  ,profile: (req, res) ->
    schoolDataModel.findById req.params.id, (err, doc)->
      financeDataModel.findOne {zip: doc.zip}, (err, result)->
        if err
          res.send err
        console.log result.ssiPercent, result.cpaPercent
        res.render "school-profile", {school: doc, finance: result}

  ,find: (req, res) ->
    res.render "find"
  }

