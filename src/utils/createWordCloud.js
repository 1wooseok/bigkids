export default function createWordCloud(WORD_CLOUD_DATA) {
  if (!WORD_CLOUD_DATA) return null;

  const width = document.getElementById('WORD_CLOUD').offsetWidth;
  console.log(width)
  d3.layout
    .cloud()
    // .size([width, width])
    .words(
      WORD_CLOUD_DATA.map((d) => ({
        text: d.text,
        size: fonts[~~(Math.random()*10) % fonts.length] * 1.3,
        color: d.color,
      }))
    )
    .padding(5)
    .rotate(() => ~~(Math.random() * 0) * 90) // ~~ : 소수점 버리기
    .fontSize((d) => d.size)
    .on("end", draw)
    .start();

  
  function draw(words) {
    d3.select("#WORD_CLOUD")
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${width}`)
      .append("g")
      .attr("transform", `translate(${width/2}, ${width/2})`) // ${width/2}, ${width/2}
      .selectAll("text")
      .data(words)
      .enter()
      .append("text")
      .style("font-size", d => d.size)
      .style("fill", (d) => d.color)
      .attr("text-anchor", "middle")
      .attr("transform", (d) => `translate(${[d.x, d.y]}) rotate(${d.rotate}) scale(0.9)`)
      .text((d) => d.text);
  }
}
const fonts = [12, 16, 22, 28];