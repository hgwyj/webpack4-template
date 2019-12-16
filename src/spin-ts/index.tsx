import * as React from "react";
const styles = require('./index.less');
// import styles from './index.less';

interface SpinProps {
    size?: string;
};

class Spin extends React.Component<SpinProps>{
    render() {
        return (
            <div className={styles.title}>this is spin component</div>
        )
    }
};

export default Spin;
