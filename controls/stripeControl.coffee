stripe = require("stripe")("sk_test_BQokikJOvBiI2HlWgH4olfQ2")


module.exports = {

  checkoutForm: (req, res) ->
    console.log "checkout form"
    res.render "checkout"

  ,checkoutSuccess: (req, res)->
    console.log "checkout success", stripe

    stripeToken = req.body.stripeToken

    charge = stripe.charges.create {
      amount: 1000,
      currency: "usd",
      card: stripeToken,
      description: "payinguser@example.com"
    }, (err, charge)->
      if err && err.type is "StripeCardError"
        res.send "The card has been declined"
      res.send "success: "+ JSON.stringify(charge)
};

