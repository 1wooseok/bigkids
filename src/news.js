function newsItem(data) {
  const { date, media, title, link } = data;
  return `
    <tr>
      <td>${date.split('-').join('')}</td>
      <td>${media}</td>
      <td>${title}</td>
      <td>${link}</td>
    </tr>
  `;
}

export function renderNews(NEWS_DATA) {
  const news_table = document.getElementById("news_table");
  news_table.innerHTML = NEWS_DATA.map(newsItem).join(" ");
}
