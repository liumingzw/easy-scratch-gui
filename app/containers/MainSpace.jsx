import React from 'react';
import CodeSpace from "./CodeSpace.jsx";

class MainSpace extends React.Component {
    render() {
        return (
            <div style={{
                width: "100%", height: "100%"
            }}>
                <CodeSpace/>
            </div>
        )
    }
}

export default MainSpace;
