// Generated by CoffeeScript 1.7.1
(function() {
  $(function() {

    /*
    ***************** Function Definitions **************
     */
    var renderDonutChart;
    renderDonutChart = function(schoolData) {
      var chartData, keys;
      keys = ["pacificIsland", "black", "white", "hispanic", "multiRacial", "asian", "nativeAmerican"];
      chartData = keys.map(function(key, ind) {
        console.log(key, schoolData.school[key]);
        return {
          name: key,
          value: schoolData.school[key]
        };
      });
      return createDonutChart(chartData, "#stat-profile");
    };

    /*
    ***************** Main Code **************
     */
    console.log(bootData);
    renderDonutChart(bootData);
    renderDonutChart(bootData);
    return renderDonutChart(bootData);

    /*
    ***************** Click Handlers **************
     */
  });

}).call(this);
