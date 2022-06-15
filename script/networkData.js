const NETWORK_DATA = {
  nodes: [
    // {
    //   id: "로블록스",
    //   value: 5,
    //   group: null,
    // },
    // {
    //   id: "메타버스",
    //   value: 3,
    //   group: null,
    // },
    // {
    //   id: "아바타",
    //   value: 3,
    //   group: null,
    // },
    // {
    //   id: "애플",
    //   value: 3,
    //   group: null,
    // },
    // {
    //   id: "미국",
    //   value: 3,
    //   group: null,
    // },
    // {
    //   id: "CEO",
    //   value: 3,
    //   group: null,
    // },
    {
      id: "청원",
      value: 2,
      group: null,
    },
    {
      id: "유씨",
      value: 2,
      group: null,
    },
    {
      id: "누리꾼",
      value: 2,
      group: null,
    },
    {
      id: "명예훼손 혐의",
      value: 2,
      group: null,
    },
  ],
  links: [
    {
      source: "로블록스",
      target: "아바타",
      value: 2,
    },
    {
      source: "로블록스",
      target: "메타버스",
      value: 2,
    },
    {
      source: "로블록스",
      target: "애플",
      value: 2,
    },
    {
      source: "로블록스",
      target: "미국",
      value: 2,
    },
    {
      source: "로블록스",
      target: "CEO",
      value: 2,
    },
    {
      source: "아바타",
      target: "로블록스",
      value: 2,
    },
    {
      source: "아바타",
      target: "메타버스",
      value: 2,
    },
    {
      source: "메타버스",
      target: "아바타",
      value: 2,
    },
    {
      source: "메타버스",
      target: "로블록스",
      value: 2,
    },
    {
      source: "메타버스",
      target: "애플",
      value: 2,
    },
    {
      source: "애플",
      target: "메타버스",
      value: 2,
    },
    {
      source: "애플",
      target: "로블록스",
      value: 2,
    },
    {
      source: "미국",
      target: "로블록스",
      value: 2,
    },
    {
      source: "미국",
      target: "메타버스",
      value: 2,
    },
    {
      source: "CEO",
      target: "로블록스",
      value: 2,
    },
    
  ],
};

const SAMPLE = {
  result: 0,
  return_object: {
    nodes: [
      {
        id: 2,
        name: "청원",
        level: "유씨",
        weight: 1.33,
      },
      {
        id: 3,
        name: "유씨",
        level: "청원",
        weight: 0.86,
      },
      {
        id: 4,
        name: "누리꾼",
        level: "청원",
        weight: 0.67,
      },
      {
        id: 5,
        name: "명예훼손 혐의",
        level: "청원",
        weight: 0.67,
      },
    ],
  },
};

const myLinks = SAMPLE.return_object.nodes.map((info) => {
  const { name, level, weight } = info;
  return {
    source: name,
    target: level,
    value: weight,
  };
});

// console.log({myLinks});