import React, { Component } from "react";
import Loader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";

const override = css`
    display: block;
    opacity: 0.5;
`;

const styles = {
    "wrapper" : {
        "width": "100%",
        "height": "100%",
        "top": 0,
        "left": 0,
        "position": "fixed",
        "outline": 0,
        "backgroundColor": "black",
        "opacity": 0.8,
        "zIndex": 1,
    },
    "reactSpinner" : {
        "position": "absolute",
        "top": "40%",
        "left": "47%",
    }
}

export default class Spinner extends Component {

    constructor(props) {
        super(props);
        this.state = {
            "spinner" : false,
        };
    }

    showSpinner() {
        this.setState({
            "spinner": true,
        });
    }

    hideSpinner(callback) {
        this.setState({
            "spinner" : false,
        }, () => {
            if (callback) {
                setTimeout(function () {
                    callback();
                }, 510);
            }
        });
    }

    render() {
        return (
            <div style={this.state.spinner ? styles.wrapper : null}>
                <div style={styles.reactSpinner}>
                    <Loader
                        css={override}
                        sizeUnit={"px"}
                        size={135}
                        color={"#265aa6"}
                        loading={this.state.spinner}
                    />
                </div>
            </div>
        );
    }
}
