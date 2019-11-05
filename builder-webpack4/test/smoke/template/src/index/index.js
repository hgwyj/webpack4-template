import React from "react";
import ReactDOM from "react-dom";

class IndexComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <h1>1231321313</h1>
        );
    }
};
ReactDOM.render(<IndexComponent />,
    document.getElementById("root"));