
var createDonutChart = function(chartData, target){

  console.log("donut: ",chartData, target)

  var width = 400,
      height = 400,
      radius = Math.min(width, height) / 2;

  var color = d3.scale.ordinal()
      .range(["#334960", "#9B58B5", "#3598DB", "#2DCC70", "#F1C40F", "#E77E23", "#E84C3D"]);

  var arc = d3.svg.arc()
      .outerRadius(radius - 10)
      .innerRadius(radius - 70);

  var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d.value; });

  var svg = d3.select(target).append("div").attr("class", "col-md-4")
    .append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  chartData.forEach(function(d) {
    d.value = +d.value;
  });

  var g = svg.selectAll(".arc")
      .data(pie(chartData))
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.name); })
      // .on("mouseenter", function(d) {
      //         console.log("mousein")
      // })
      // .on("mouseout", function(d) {
      //          console.log("mouseout")
      // });

  svg.append("circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", radius-80)
    .attr("fill", "#F1F1F1");

  svg.append("text")
    .attr("dy", "0em")
    .style("text-anchor", "middle")
    .attr("class", "inside")
    .text(function(d) { return "Demographic Data"; });

  // var path = svg.selectAll("path")
  //   .data(pie(dataset.hddrives))
  //     .enter().append("path")
  //    .attr("class", "arc")
  //   .style("opacity", function(d, i) { return i == dataset.hddrives.length - 1 ? 0 : 1; })
  //   .attr("fill", function(d, i) { return color(i); })
  //   .attr("d", arc);

  // g.append("text")
  //     .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
  //     .attr("dy", ".35em")
  //     .style("text-anchor", "middle")
  //     .text(function(d) { return d.data.name; });

}
