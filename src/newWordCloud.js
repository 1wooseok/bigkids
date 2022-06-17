export function createNewWordCloud(WORD_CLOUD_DATA) {
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

  d3.layout
    .cloud()
    .size([width, height])
    .words(
      WORD_CLOUD_DATA.map(function (d) {
        return { text: d.text, size: d.size * 6, color: d.color };
      })
    )
    .padding(5)
    .rotate(function () {
      return ~~(Math.random() * 0) * 90; // ~~ : 소수점 버리기
    })
    .font("Impact")
    .fontSize(function (d) {
      return d.size;
    })
    .on("end", draw)
    .start();

  function draw(words) {
    d3.select("#word-cloud")
      .append("svg")
      .attr("viewBox", `50 5 ${width * 1.2} ${height * 1.2}`)
      .append("g")
      .attr("transform", "translate(300,300)")
      .selectAll("text")
      .data(words)
      .enter()
      .append("text")
      .style("font-size", (d) => `${d.size}px`)
      .style("fill", (d) => d.color)
      .attr("text-anchor", "middle")
      .attr("transform", (d) => `translate(${[d.x, d.y]}) rotate(${d.rotate})`)
      .text((d) => d.text);
  }
}
