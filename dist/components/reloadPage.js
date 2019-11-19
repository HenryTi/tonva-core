import * as React from 'react';
import { nav } from './nav';
import { Page } from './page';
export class ReloadPage extends React.Component {
    constructor(props) {
        super(props);
        this.reload = () => {
            clearInterval(this.timerHandler);
            nav.reload();
        };
        this.state = { seconds: 10 };
        this.timerHandler = setInterval(() => {
            let seconds = this.state.seconds;
            seconds--;
            if (seconds <= 0) {
                this.reload();
            }
            else {
                this.setState({ seconds: seconds });
            }
        }, 1000);
    }
    render() {
        return React.createElement(Page, { header: false },
            React.createElement("div", { className: "text-center p-5" },
                React.createElement("div", { className: "text-info py-5" },
                    "\u7A0B\u5E8F\u9700\u8981\u5347\u7EA7\uFF0C",
                    this.state.seconds,
                    "\u79D2\u949F\u4E4B\u540E\u81EA\u52A8\u91CD\u542F\u52A8...",
                    React.createElement("br", null),
                    React.createElement("span", { className: "small text-muted" }, this.props.message)),
                React.createElement("button", { className: "btn btn-danger", onClick: this.reload }, "\u7ACB\u523B\u5347\u7EA7")));
    }
}
//# sourceMappingURL=reloadPage.js.map