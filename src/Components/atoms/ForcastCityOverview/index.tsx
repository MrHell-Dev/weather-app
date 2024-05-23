import React from 'react';
import styles from './index.module.scss';

interface IForcastCityOverView {
    name?: string;
    temp?: string;
}

function ForcastCityOverview(props: IForcastCityOverView) {
    const { name, temp } = props;
    return (
        <div className={styles.cityOverview}>
            <div>
                <div className={styles.details}>
                    <h4>{name}</h4>
                </div>
                <h3 className="tempatureLabel">{temp}</h3>
            </div>
            <div>Icon</div>
        </div>
    );
}

export default ForcastCityOverview;
