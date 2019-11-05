import React from "react";
import ReactDOM from "react-dom";
import styles from "./index.less";
class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <h1 className={styles.h1}>this is my search app</h1>
        );
    }
};

ReactDOM.render(<Search />,
    document.getElementById("root"));