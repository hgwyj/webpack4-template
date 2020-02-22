import React from "react";
import styles from '@/spin-ts/index.less';

interface SpinProps {
    size?: string;
};

class Spin extends React.Component<SpinProps> {
    render() {
        return (
            <div className={styles.title}>this is spin component</div>
        )
    }
};

export default Spin;