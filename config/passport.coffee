passport = require "passport"
GoogleStrategy = require("passport-google-oauth").OAuth2Strategy
UserModel = require "../models/userModel"


passport.serializeUser (user, done)->
  done null, user._id

passport.deserializeUser (id, done)->
  UserModel.findById id, (err, user)->
    done(err, user)


googleAuth = {
  clientID: global.process.env.GOOGLE_CLIENT_ID,
  clientSecret: global.process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: global.process.env.GOOGLE_CALLBACK_URL
}

googleStrategy = new GoogleStrategy googleAuth, (accessToken, refreshToken, profile, done)->
  console.log accessToken, refreshToken, profile

  process.nextTick ()->
    UserModel.findOne {userid: profile.id}, (err, user)->
      if err then return done err
      if user then return done null, user
      

      newUser = new UserModel {
        userid: profile.id,
        name: profile.displayName,
        profile: profile
      }
      newUser.save (err)->
        if err then throw err
        return done(null, newUser)


passport.use googleStrategy
