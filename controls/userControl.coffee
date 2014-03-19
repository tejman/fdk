schoolDataModel = require "../models/schoolModel.js"
userModel = require "../models/userModel.js"
financeDataModel = require "../models/financeModel.js"


module.exports = {

  profile: (req, res) ->
    userModel.findOne {_schoolId: req.params.id}, (err, result)->
      if err then console.log err
      else
        schoolDataModel.findById req.params.id, (err, doc)->
          JSONdoc = doc.toJSON({virtuals: true})
          console.log JSONdoc
          res.render "schoolAdmin", {school: JSONdoc, userSchool: if result then result.profile else null}
};

