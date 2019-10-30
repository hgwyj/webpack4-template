import React from "react";
import ReactDOM from "react-dom";
class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <h1>this is my search app1</h1>
        );
    }
};

ReactDOM.render(<Search />,
    document.getElementById("root"));