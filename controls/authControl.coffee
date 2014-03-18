
module.exports = {

  login: (req,res)->
    console.log "login"
    if req.isAuthenticated()
      res.redirect "/"
    else
      res.send "login"

  ,loginSuccess: (req,res)->
    console.log "loginSuccess"
    res.redirect "/"

  ,logout: (req,res)->
    console.log "logout"
    res.logout()
    res.redirect "/login"

  ,ensureAuthenticated: (req,res)->
    console.log "ensureAuthenticated"
    if req.isAuthenticated
      return next()
    res.redirect "/login"

  ,ensureAuthenticatedAjax: (req,res)->
    console.log "ensureAuthenticatedAjax"
    if req.isAuthenticated
      return next()
    res.send 401

}