// Generated by CoffeeScript 1.7.1
(function() {
  $(function() {

    /*
    ***************** Function Definitions **************
     */
    var renderDonutChart, stripeStyle;
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
    $(document).on("change", "#donation input", function() {
      return console.log("test");
    });
    stripeStyle = function() {
      var $stripeButton, $stripeButtonSpan;
      console.log("timer");
      if ($(".stripe-button-el").length) {
        console.log("stripe fxns");
        $stripeButton = $(".stripe-button-el");
        $stripeButtonSpan = $stripeButton.find("span");
        console.log($stripeButton, $stripeButtonSpan);
        $stripeButton.css("background", "#2CC36B");
        $stripeButtonSpan.css("background", "#2CC36B");
        return $stripeButtonSpan.text("Feed!");
      } else {
        return false;
      }
    };
    return stripeStyle();

    /*
    ***************** Click Handlers **************
     */
  });

}).call(this);
