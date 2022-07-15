import {
  Component,
  TOS_Modal
} from "./index.js";

export default class Modal extends Component {
  setup() {
    this.state = {
      CURR_MODAL: null
    };
  }
  mounted() {
    const modal = document.getElementById("modal");

    new TOS_Modal(modal, {
      CURR_MODAL: this.state.CURR_MODAL,
      setCurrentModal: this.setCurrentModal.bind(this)
    });
  }

  setEvent() {
    document.querySelector('footer').onclick = e => {
      e.stopImmediatePropagation();
      if (e.target.id === 'modal1_btn') {
        this.setCurrentModal('YPP');
      }
      if (e.target.id === 'modal2_btn') {
        this.setCurrentModal('TOS');
      }
    }
  }

  setCurrentModal(CURR_MODAL) {
    this.setState({ CURR_MODAL });
  }
}