export default function renderLineChart(LINE_CHART_DATA) {
  if (!LINE_CHART_DATA) return null;
  if (LINE_CHART_DATA.length === 0) return null;

  const data = {
    labels: ["", "", "", "", "", "", ""],
    datasets: [
      {
        label: "  조회수 ",
        data: LINE_CHART_DATA.map((l) => l.value),
        borderColor: "#b8e4ff",
        backgroundColor: "#b8e4ff",
        borderJoinStyle: "round",
        tension: 0.1,
        pointBorderWidth: 10,
        drawActiveElementsOnTop: false,
        categoryPercentage: 0.8,
      },
    ],
  };

  const options = {
    barPercentage: 1,
    categoryPercentage: 0.8,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const config = {
    type: "line",
    data: data,
    options,
  };

  Chart.defaults.font.family = "NanumSquareRound";
  Chart.defaults.font.size = 20;

  const myChart = new Chart(document.getElementById("myChart"), config);
  return myChart;
}

export function updateLineChart(myLineChart, LINE_CHART_DATA) {
  if (!LINE_CHART_DATA || !myLineChart) return null;
  if (LINE_CHART_DATA.length === 0) return null;
  myLineChart.datasets = LINE_CHART_DATA.map((x) => x.value);
  myLineChart.update();
}