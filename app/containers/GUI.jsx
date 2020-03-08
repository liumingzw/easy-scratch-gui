import React from 'react';

class GUI extends React.Component {
    render() {
        return (
            <div style={{
                position: "absolute",
                top: "5px",
                left: "5px",
                right: "5px",
                bottom: "5px",
                backgroundColor: "#e0e0e0"
            }}>
                <div id="header1" style={{width: "100%", height: "48px", backgroundColor: "#a0a0a0"}}>
                </div>
                <div id="header2" style={{width: "100%", height: "44px", backgroundColor: "#f0f0f0"}}>
                </div>
                <div style={{
                    position: "absolute",
                    top: "92px",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "#a0f0f0"
                }}>
                    <div id="mainSpace" style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: "480px",
                        bottom: 0,
                        backgroundColor: "red"
                    }}>
                    </div>
                    <div id="stage" style={{
                        position: "absolute",
                        width: "480px",
                        height: "360px",
                        top: 0,
                        right: 0,
                        backgroundColor: "blue"
                    }}>
                    </div>
                    <div id="targetsControl" style={{
                        position: "absolute",
                        width: "480px",
                        top: "360px",
                        right: 0,
                        bottom: 0,
                        backgroundColor: "yellow"
                    }}>
                    </div>
                </div>
            </div>
        )
    }
}

export default GUI;
