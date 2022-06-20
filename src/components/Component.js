export default class Component {
  target;
  state;
  props;
  constructor(target, props) {
    this.target = target;
    this.props = props;
    this.setup();
    this.render()
    this.setEvent();
  }
  setup() {}
  setEvent() {}
  mounted() {}
  template() {
    return ``;
  }
  render() {
    if (this.template() !== ``) {
      this.target.innerHTML = this.template();
    }
    this.mounted();
  }
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }
}
