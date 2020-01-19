import React, { Component } from "react";
import ReactPaginate from 'react-paginate';

export default class Paginator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            "limit" : !props.limit ? 10 : props.limit,
            "total" : props.total,
            "active" : 1,
        };
    }

    componentWillUpdate(nextProps) {
        if (this.state.total !== nextProps.total) {
            this.setState({"total" : nextProps.total});
        }
    }

    render() {
        return (
            <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={this.state.total}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={data => {
                    const startIndex = data.selected;

                    this.props.onPress(startIndex);
                }}
                containerClassName={"pagination"}
                subContainerClassName={"pagination"}
                activeClassName={"active"}
            />
        );
    }
}
