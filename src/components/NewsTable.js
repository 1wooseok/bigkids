import Component from "./Component.js";

export default class NewsTable extends Component {
  template() {
    const { NEWS_DATA } = this.props;
    if (!NEWS_DATA)
      return `<div id="NEWS_Loader"><div class='spinner2'></div></div>`;
    if (NEWS_DATA.length === 0)
      return `<div class='no_data' style="position: absolute; max-height:150px;">데이터가 존재하지 않습니다.</div>`;
    return `
      ${NEWS_DATA.map((data) => {
        const { date, media, title, link } = data;
        return `
          <tr>
            <td>${date.split("-").join(". ")}</td>
            <td>${media}</td>
            <td>${title}</td>
            <td><a href="${link}" target="_blank">${link}<a></td>
          </tr>
        `;
      }).join("")}
    `;
  }
}
