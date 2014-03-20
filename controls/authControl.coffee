
module.exports = {

  login: (req,res)->
    console.log "login"
    if req.isAuthenticated()
      res.redirect "/"
    else
      res.render "login"

  ,loginSuccess: (req,res)->
    console.log "loginSuccess"
    res.redirect "/"

  ,logout: (req,res)->
    console.log "logout"
    req.logout()
    res.redirect "/login"

  ,ensureAuthenticated: (req,res, next)->
    console.log "ensureAuthenticated"
    if req.isAuthenticated()
      return next()
    res.redirect "/login"

  ,ensureAuthenticatedAjax: (req,res, next)->
    console.log "ensureAuthenticatedAjax"
    if req.isAuthenticated()
      return next()
    res.send 401

}