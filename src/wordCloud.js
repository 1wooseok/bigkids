export function createWordCloud(WORD_CLOUD_DATA) {
  let margin = { top: 10, right: 10, bottom: 10, left: 10 };
  const WINDOW_WIDTH = window.innerWidth;
  let width =
    WINDOW_WIDTH < 850
      ? WINDOW_WIDTH * 1.3
      : WINDOW_WIDTH < 1500
      ? WINDOW_WIDTH / 2
      : WINDOW_WIDTH < 1800
      ? WINDOW_WIDTH / 2.5
      : WINDOW_WIDTH / 3;
  let height =
    WINDOW_WIDTH < 850
      ? WINDOW_WIDTH * 1.3
      : WINDOW_WIDTH < 1500
      ? WINDOW_WIDTH / 2
      : WINDOW_WIDTH < 1800
      ? WINDOW_WIDTH / 2.5
      : WINDOW_WIDTH / 3;

  width = width - margin.left - margin.right;
  height = height - margin.top - margin.bottom;

  let svg = d3
    .select("#word-cloud")
    .append("svg")
    .attr("viewBox", `0 0 ${width*1.2} ${height*1.2}`);

  let layout = d3.layout
    .cloud()
    .size([width, height])
    .words(WORD_CLOUD_DATA)
    .padding(14)
    .rotate(0)
    .fontSize((d) => d.size)
    .on("end", draw)
  .text(d => d.text) // THE SOLUTION

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
      .style("font-size", (d) => `${d.size / 8}rem`)
      .style("fill", (d) => d.color)
      .attr("text-anchor", "middle")
      .attr("transform", (d) => `translate(${[d.x, d.y / 1.12]})`) // rotate(${d.rotate})
      .text(function (d) {
        return d.text;
      });
  }
  layout.start();
}
