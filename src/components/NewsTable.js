import Component from "./Component.js";

export default class NewsTable extends Component {
  // constructor(render, props) {
  //   super(render, props);
  //   this.render();
  //   this.props = props;
  // }

  template() {
    const { NEWS_DATA } = this.props;
    if (!NEWS_DATA) return ``;
    return `
      ${NEWS_DATA.map(data => {
        const { date, media, title, link } = data;
        return `
          <tr>
            <td>${date.split("-").join("")}</td>
            <td>${media}</td>
            <td>${title}</td>
            <td>${link}</td>
          </tr>
        `
      }).join("")}
    `; 
  }
}