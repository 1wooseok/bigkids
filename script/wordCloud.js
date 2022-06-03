// set the dimensions and margins of the graph
var margin = { top: 10, right: 10, bottom: 10, left: 10 },
  width = window.innerWidth/2 - margin.left - margin.right,
  height = window.innerWidth/2 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3
  .select("#word-cloud")
  .append("svg")
  // .attr("viewBox", `0 0 ${width*1.2} ${height*1.2}`)
  .attr("viewBox", `0 0 ${width} ${height}`)
  .append("g")
  .attr("tranform", `translate(${margin.left},${margin.top})`);

// Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
var layout = d3.layout
  .cloud()
  .size([width, height])
  .words(myWords)
  .padding(5)
  .fontSize((d) => d.size)
  .on("end", draw);

layout.start();

// This function takes the output of 'layout' above and draw the words
// Better not to touch it. To change parameters, play with the 'layout' variable above
function draw(words) {
  svg
    .append("g")
    .attr(
      "transform",
      "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")"
    )
    .selectAll("text")
    .data(words)
    .enter()
    .append("text")
    .style("font-size", (d) => `${d.size/20}em`)
    .style("margin", (d) => `10px`)
    .style("fill", (d) => d.color)
    .attr("text-anchor", "middle")
    .attr("transform", (d) => `translate(${[d.x, d.y / 1.12]})`) //rotate(${d.rotate})
    .text(function (d) {
      return d.text;
    });
}
