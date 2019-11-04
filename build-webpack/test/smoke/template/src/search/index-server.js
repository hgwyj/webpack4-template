const React = require("react");
const styles = require("./index-server.less")
class ReactSSR extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className={styles.ssr}>
                <h1>this is my first ssrTEST instance component</h1>
            </div>
        );
    }
};
module.exports = <ReactSSR />