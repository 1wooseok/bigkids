import { mapWeightAndFont } from "./utils.js";

export default function createWordCloud(WORD_CLOUD_DATA) {
    if (!WORD_CLOUD_DATA) return;
    if (WORD_CLOUD_DATA.length === 0) return;

    const fonts = mapWeightAndFont(WORD_CLOUD_DATA);
    const width = document.getElementById("word_cloud").clientWidth;
    const wrap_scale = width < 580 ? 1.3 : 2;

    d3.layout
        .cloud()
        .words(
            WORD_CLOUD_DATA.map((d) => ({
                text: d.text,
                size: fonts[d.size],
                color: d.color,
            }))
        )
        .padding(5)
        .rotate(() => ~~(Math.random() * 0) * 90)
        .fontSize((d) => d.size)
        .on("end", draw)
        .start();

    function draw(words) {
        d3.select("#word_cloud")
            .append("svg")
            .attr("viewBox", `0 0 ${width} ${width}`)
            .append("g")
            .attr("transform", `translate(${width / 2}, ${width / 2}) scale(${wrap_scale})`)
            .selectAll("text")
            .data(words)
            .enter()
            .append("text")
            .style("font-size", d => d.size)
            .style("fill", (d) => d.color)
            .attr("text-anchor", "middle")
            .attr(
                "transform",
                (d) => `translate(${[d.x, d.y]}) rotate(${d.rotate}) scale(1)`
            )
            .text((d) => d.text);
    }
}
;