const NETWORK_DATA = {
  nodes: [
    {
      id: "청원",
      value: 2,
    },
    {
      id: "유씨",
      value: 2,
    },
    {
      id: "누리꾼",
      value: 2,
    },
    {
      id: "명예훼손 혐의",
      value: 2,
    },
  ],
};

const SAMPLE = {
  result: 0,
  return_object: {
    nodes: [
      {
        name: "청원",
        level: "유씨",
      },
      {
        name: "유씨",
        level: "청원",
      },
      {
        name: "누리꾼",
        level: "청원",
      },
      {
        name: "명예훼손 혐의",
        level: "청원",
      },
    ],
  },
};

const myLinks = SAMPLE.return_object.nodes.map((info) => {
  const { name, level } = info;
  return {
    source: name,
    target: level,
  };
});

function generateLinksByNodes(NODES) {
  return NODES.map((node) => {
    const { id, value } = node;
    return {
      soucre: id,
      target: value, 
    };
  });
}
console.log(myLinks)