import React from 'react';
import {actions as testActions} from "../reducers/test";
import connect from "react-redux/es/connect/connect";

class TestRedux extends React.Component {
    render() {
        return (
            <div style={{
                width: "100%", height: "100%"
            }}>
                <button onClick={this.props.countPlus}>click count: {this.props.clickCount}</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {clickCount} = state.test;
    return {
        clickCount
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        countPlus: () => dispatch(testActions.countPlus()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TestRedux);
