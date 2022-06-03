const canvas = document.getElementById('myChart');
canvas.width = window.innerWidth * 0.5;


const labels = ["월", "화", "수", "목", "금", "토", "일", "월"];

const data = {
  labels: labels,
  datasets: [
    {
      data: [0, 7, 5, 3, 8, 0, 7, 2],
      borderColor: "skyblue",
      tension: 0.1,
      pointBorderWidth: 10,
    },
  ],
};

const options = {
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

const myChart = new Chart(document.getElementById("myChart"), config);
