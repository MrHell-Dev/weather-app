import React from 'react';
import styles from './index.module.scss';
function ProgressBar(props: { show: boolean }) {
    const { show = false } = props;
    return <div className={show ? styles.progressBar : ''} />;
}

export default ProgressBar;
