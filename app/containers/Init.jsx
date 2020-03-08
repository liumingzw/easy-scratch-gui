import React from 'react';
import {actions as vmActions} from "../reducers/vm";
import connect from "react-redux/es/connect/connect";

class Init extends React.Component {
    constructor(props) {
        super(props);
        if (!this.props.vm) {
            this.props.initVm();
        }
    }

    render() {
        return null;
    }
}

const mapStateToProps = (state) => {
    const {vm} = state.vm;
    return {
        vm
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        initVm: () => dispatch(vmActions.initVm()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Init);
