schoolDataModel = require "../models/schoolModel.js"


module.exports = {

  popStateDropdown: (req, res) ->
    schoolDataModel.getAllStates (err, results)->
      res.send results

};

