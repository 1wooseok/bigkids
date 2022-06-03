const canvas = document.getElementById("myChart");
canvas.width = window.innerWidth * 0.5;

const labels = ["", "", "", "", "", "", "", ""];

const data = {
  labels: labels,
  datasets: [
    {
      label: "  조회수 ",
      data: [0, 7, 5, 3, 8, 0, 7, 2],
      borderColor: "skyblue",
      backgroundColor: "skyblue",
      borderJoinStyle: 'round',
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
