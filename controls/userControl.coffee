schoolDataModel = require "../models/schoolModel.js"
userModel = require "../models/userModel.js"
financeDataModel = require "../models/financeModel.js"


module.exports = {

  profile: (req, res) ->
    myID = if req.params.id then req.params.id ele "531f6d9c77f4d4be42dee22f"
    userModel.findOne {_schoolId: myID}, (err, result)->
      if err then console.log err
      else
        schoolDataModel.findById myID, (err, doc)->
          JSONdoc = doc.toJSON({virtuals: true})
          console.log JSONdoc
          res.render "school-admin", {school: JSONdoc, userSchool: if result then result.profile else null}

  ,update: (req, res)->
    res.send req.body.formData
};

