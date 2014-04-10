$ ->
  ###
  ***************** Function Definitions **************
  ###
  renderDonutChart = (schoolData)->
    keys = ["pacificIsland", "black", "white", "hispanic", "multiRacial", "asian", "nativeAmerican"]
    chartData = keys.map (key, ind)->
      console.log key, schoolData.school[key]
      {name: key, value: schoolData.school[key]}

    createDonutChart(chartData, "#stat-profile")



  ###
  ***************** Main Code **************
  ###

  console.log bootData
  renderDonutChart bootData

  $(document).on "change", "#donation input", ()->
    console.log "test"


  # Stripe #

  

  stripeStyle = ()->
    console.log "timer"
    if $(".stripe-button-el").length
      console.log "stripe fxns"

      $stripeButton = $(".stripe-button-el")
      $stripeButtonSpan = $stripeButton.find("span")

      console.log $stripeButton, $stripeButtonSpan

      $stripeButton.css("background", "#2CC36B")
      $stripeButtonSpan.css("background", "#2CC36B")
      $stripeButtonSpan.text("Feed!")

    else
      return false

  stripeStyle()
  # checkStripe = setInterval(stripeStyle, 100)

  ###
  ***************** Click Handlers **************
  ###



