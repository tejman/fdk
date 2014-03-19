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

  renderDonutChart bootData
  renderDonutChart bootData
  renderDonutChart bootData


  ###
  ***************** Click Handlers **************
  ###



