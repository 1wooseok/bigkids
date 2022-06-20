export default function renderLineChart(LINE_CHART_DATA) {
  if (!LINE_CHART_DATA) return null;
  const labels = ["", "", "", "", "", "", ""];

  const data = {
    labels: labels,
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
  };

  const config = {
    type: "line",
    data: data,
    options,
  };

  Chart.defaults.font.family = "NanumSquareRound";
  Chart.defaults.font.size = 20;

  const myChart = new Chart(document.getElementById("myChart"), config);
  return myChart
}

export function updateLineChart(myLineChart, LINE_CHART_DATA) {
  if (!LINE_CHART_DATA || !myLineChart) return null;
  console.log('before', myLineChart);
  myLineChart.datasets = LINE_CHART_DATA.map((x) => x.value); // Would update the first dataset's value of 'March' to be 50
  console.log('After', myLineChart);
  myLineChart.update();
}