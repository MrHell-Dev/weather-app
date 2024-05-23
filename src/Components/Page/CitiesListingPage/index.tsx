import React from 'react';
import styles from './index.module.scss';
import CitiesListing from '@/src/Components/organism/CitiesListing';
function CitiesPage() {
    return (
        <div className={styles.pageWrapper}>
            <CitiesListing />
        </div>
    );
}

export default CitiesPage;
