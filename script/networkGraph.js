async function getNetworkGraphData() {
  try {
    const res = await fetch("../script/testData.json");
    const json = await res.json();
    return json;
  } catch (err) {
    console.log(`${err} - networkChart : json file 받아올때 에러`);
  }
}

const networkGraph = {
  createGraph: async function () {
    // const NETWORK_DATA = await getNetworkGraphData();
    const links = NETWORK_DATA.links.map((d) => {
      return Object.create(d);
    });

    const nodes = NETWORK_DATA.nodes.map((d) => {
      return Object.create(d);
    });

    const color = function (d) {
      const scale = d3.scaleOrdinal(d3.schemeCategory10);
      return scale(d.group);
    };

    const fillCircle = (g) => {
      switch (g) {
        case "bad":
          return "red";
        case "act":
          return "salmon";
        case "media":
          return "violet";
        default:
          return "white";
      }
    };

    // const WIDTH = 500;
    // const HEIGHT = 500;

    const width = 600;
    const height = 600;
    const center_word = "로블록스";
    const center_word_color = "#FF8E7E";

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3.forceLink(links).id((d) => d.id)
      )
      .force("charge", d3.forceManyBody().strength(-100))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collide",
        d3.forceCollide().radius((d) => d.value * 8)
      );

    const svg = d3
      .select("#NETWORK_GRAPH")
      .attr("viewBox", [0, 0, width, height]);
    const gHolder = svg.append("g").attr("class", "g-holder");
    const link = gHolder
      .append("g")
      .attr("stroke", "#929292")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", (d) => Math.sqrt(d.value))
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
          .attr("r", d.value * 5.2)
          .attr(
            "fill",
            d.id === center_word ? center_word_color : fillCircle(d.group)
          )
          .attr("stroke", d.id === center_word ? center_word_color : null)
          .attr("stroke-width", (d) => Math.sqrt(d.value));
        d3.select(this)
          .append("text")
          .text(d.id)
          .attr("dy", 5)
          .style("text-anchor", "middle")
          .style("font-size", "10px")
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
      //circle 노드에서 g 노드로 변경
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
/********network graph********/
networkGraph.createGraph();
