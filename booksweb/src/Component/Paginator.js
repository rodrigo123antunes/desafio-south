import React, { Component } from "react";

export default class Paginator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            "limit" : !props.limit ? 10 : props.limit,
            "total" : props.total,
            "active" : 1,
        };
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (this.state.total !== nextProps.total) {
            this.setState({"total" : nextProps.total});
        }
    }

    render() {
        const total = this.state.total;
        const limit = this.state.limit;
        const records = total / limit;

        let renderButtons = [];
        for (let i = 0; i < records; i += 1) {
            const position = i + 1;
            const startIndex = limit * i;

            renderButtons.push(
                <li
                    key={`paginate-${position}`}
                    className={`page-item ${this.state.active === position ? "active" : ""}`}
                >
                    <button
                        className="page-link"
                        onClick={() => {
                            this.setState({"active" : position});
                            this.props.onPress(startIndex);
                        }}>
                        {position}
                    </button>
                </li>
            );
        }

        return (
            <nav>
                <ul className="pagination">
                    {renderButtons}
                </ul>
            </nav>
        );
    }
}
