import React, { Component } from 'react';
import {

    faWindowMaximize,
    faWindowClose,
    faWindowMinimize
}
    from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const { ipcRenderer } = window.require("electron");

class TitleBar extends Component {
    state = {
        TitleBarName: ""
    };

    onWindowTitleChange = (e, title) => {
        this.setState({ TitleBarName: title });

    }
    componentDidMount() {
        ipcRenderer.addListener('onWindowTitleChanged', this.onWindowTitleChange);
    }

    render() {

        return (
            <div className="title-bar w-100 ">
                <div className="container-fluid">
                    <div class="row d-flex flex-row">
                        <div class="col-9 justify-content-center">
                            <div>{this.state.TitleBarName}</div></div>
                        <div class="col-3 d-flex flex-row ">
                            <div class=" col-6 icon-container d-flex justify-content-center">
                                <FontAwesomeIcon icon={faWindowMinimize} fixedWidth size='lg' />
                            </div>
                            <div class="col-6 icon-container d-flex justify-content-center">
                                <FontAwesomeIcon icon={faWindowClose} fixedWidth size='lg' />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default TitleBar;