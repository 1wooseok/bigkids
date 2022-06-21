export default function createNetworkGraph(NETWORK_DATA, LINKS) {
  if (!NETWORK_DATA || !LINKS) return null;
  const networkGraph = {
    createGraph: function () {
      const nodes = NETWORK_DATA.nodes.map((d) => {
        return Object.create(d);
      });
      const links = LINKS.map((d) => {
        return Object.create(d);
      });

      const width = parseInt(document.getElementById("network_wrap").offsetWidth) * 1.3; // 400으로 고정해보기

      const center_word = NETWORK_DATA.nodes[0].id; // 임시
      const center_word_color = "#FF8E7E";

      const simulation = d3
        .forceSimulation(nodes)
        .force(
          "link",
          d3.forceLink(links).id((d) => d.id)
        )
        .force("charge", d3.forceManyBody().strength(-100))
        .force("center", d3.forceCenter(width / 2, width / 2))
        .force(
          "collide",
          d3.forceCollide().radius((d) => d.value * 15)
        );

      const svg = d3
        .select("#NETWORK_GRAPH")
        .attr("viewBox", `0 0 ${width} ${width}`); // 640 640
      const gHolder = svg.append("g").attr("class", "g-holder");
      const link = gHolder
        .append("g")
        .attr("stroke", "#929292")
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke-linecap", "round"); // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linecap

      const node = gHolder
        .append("g")
        .attr("class", "circle-node-holder") // .attr(
        .selectAll("g")
        .data(nodes)
        .enter()
        .append("g")
        .each(function (d) {
          d3.select(this)
            .append("circle")
            .attr("r", Math.min(d.value * 9, 30)) //
            .attr("fill", d.id === center_word ? center_word_color : "white")
            .attr("stroke", d.id === center_word ? center_word_color : null)
            .attr("stroke-width", (d) => Math.sqrt(d.value));
          d3.select(this)
            .append("text")
            .text(d.id)
            .attr("dy", 6)
            .style("text-anchor", "middle")
            .style("font-size", "18px") // 12px'
            .style("font-weight", 800)
            .attr("class", "node-label");
        })
        .call(networkGraph.drag(simulation));

      simulation.on("tick", () => {
        link
          .attr("x1", (d) => d.source.x)
          .attr("y1", (d) => d.source.y)
          .attr("x2", (d) => d.target.x)
          .attr("y2", (d) => d.target.y);
        node.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
      });
      return svg.node();
    },
    drag: function (simulation) {
      function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }

      function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      return d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    },
  };
  networkGraph.createGraph();
}
