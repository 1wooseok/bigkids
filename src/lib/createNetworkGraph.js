export default function createNetworkGraph(NETWORK_DATA, LINKS) {
  const setRadius = (value, scale) => {
    return Math.min(value * scale, 34);
  }

  const networkGraph = {
    createGraph: function () {
      const nodes = NETWORK_DATA.nodes.map((d) => {
        return Object.create(d);
      });
      const links = LINKS.map((d) => {
        return Object.create(d);
      });

      const props = {
        width: Number(document.getElementById("network_wrap").clientWidth),
        mobile_width: 580,
        center_word: NETWORK_DATA.nodes[0].id,
        center_word_color: "#FF8E7E",
        ratio: this.width < this.mobile_width ? 5 : 10,
        strength: this.width < this.mobile_width ? 45 : -45,
        collide: this.width < this.mobile_width ? 18 : 25,
      }

      const { width, mobile_width, center_word, center_word_color, ratio, strength, collide } = props;

      let fontSize = width < 580 ? 7 : 10;

      const simulation = d3
        .forceSimulation(nodes)
        .force(
          "link",
          d3.forceLink(links).id((d) => d.id)
        )
        .force("charge", d3.forceManyBody().strength(strength))
        .force("center", d3.forceCenter(width / 2, width / 2))
        .force(
          "collide",
          d3.forceCollide().radius((d) => d.value * collide)
        );

      const svg = d3
        .select("#NETWORK_GRAPH")
        .attr("viewBox", `0 0 ${width} ${width}`);
      const gHolder = svg.append("g").attr("class", "g-holder").attr("transform", `scale(0.88)`);
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
            .attr("r", d.id === center_word ? setRadius(d.value, ratio * 1.5) : setRadius(d.value, ratio))
            // .attr("r", d.id === center_word ? Math.min(d.value * ratio * 1.5, 34) : Math.min(d.value * ratio, 34))
            .attr("fill", d.id === center_word ? center_word_color : "white")
            .attr("stroke", d.id === center_word ? center_word_color : null)
            .attr("transform", (d) => {
              if (d.id === center_word) {
                if (width < mobile_width) {
                  return "scale(1.1)"
                }
                return "scale(1.3)"
              }
            })
            .attr("stroke-width", 1);
          d3.select(this)
            .append("text")
            .text(d.id)
            .attr("dy", 6)
            .style("text-anchor", "middle")
            .style("font-size", d => `${Math.max(16, d.value * fontSize)}px`) // 모바일 22, PC 30
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