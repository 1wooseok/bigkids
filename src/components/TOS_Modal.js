import Component from "./Component.js";

export default class TOS_Modal extends Component {
    template() {
        const { CURR_MODAL } = this.props;

        if (!CURR_MODAL) return `<div></div>`;

        if (CURR_MODAL === 'YPP') return `
            <div class="modal">
                <div class="modal_bg"></div>
                <div class="modal1">
                    <div class="modal_body-1">
                        <div class="modal_top">
                            <p>청소년보호정책</p>
                            <button class="modal_close"><img class="modal_close" src='../../static/image/cls.png' alt=""></button>
                        </div>
                        <div class="modal_title">
                            <div class="logo"><img src='../../static/image/logo.png' alt="logo" /></div>

                            타이밍포올(빅키즈)은 어린이와 청소년이 건전한 인격체로 성장할 수 있도록 하기 위하여 어린이와 청소년 보호정책을 수립, 시행하고 있습니다.
                            이하 타이밍포올(빅키즈)이 본 정책을 통하여 어린이와 청소년의 보호를 위해 어떠한 조치를 취하고 있는지 알려드립니다.
                        </div>
                        <div class="modal_body">
                            <div class="modal_box">
                                <div class="modal_text">
                                    ` + document.getElementById('terms').innerHTML + `
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        if (CURR_MODAL === 'TOS') return (`
        <div class="modal">
            <div class="modal_bg"></div>
            <div class="modal2">
                <div class="modal_body-2">
                    <div class="modal_top">
                        <p>이용 약관</p>
                        <button class="modal_close"><img class="modal_close" src='../../static/image/cls.png' alt=""></button>
                    </div>
                    <div class="modal_bodys">
                        <div class="logo"><img src='../../static/image/logo.png' alt="logo" /></div>
                        ` + document.getElementById('manual').innerText + `
                    </div>
                </div>
            </div>
        </div> 
        `);
    }

    setEvent() {
        const { setCurrentModal } = this.props;

        this.target.onclick = e => {
            if (e.target.classList.contains('modal_bg')) {
                setCurrentModal(null)
            }
            if (e.target.classList.contains('modal_close')) {
                setCurrentModal(null)
            }
        }
    }
}