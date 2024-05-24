import WeatherImage from '@/src/Components/atoms/WeatherImage';
import styles from './index.module.scss';

interface IForcastCityOverView {
    name?: string;
    temp?: string;
    weatherCode?: any;
}

function ForcastCityOverview(props: IForcastCityOverView) {
    const { name, temp, weatherCode } = props;
    return (
        <div className={styles.cityOverview}>
            <div>
                <div className={styles.details}>
                    <h4>{name}</h4>
                </div>
                <h3 className="tempatureLabel">{temp}</h3>
            </div>
            <div className={styles.iconWrapper}>
                <WeatherImage weatherCode={weatherCode} />
            </div>
        </div>
    );
}

export default ForcastCityOverview;
