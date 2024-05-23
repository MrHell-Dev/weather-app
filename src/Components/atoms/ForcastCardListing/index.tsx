import { classNameMerger } from '@/src/Libs/Utils/Common';
import { Col, Row } from 'react-bootstrap';
import styles from './index.module.scss';

interface IForecastingCardListingData {
    className?: string;
    todaysForecastingData: {
        time: string;
        temp: string;
        code: number;
    }[];
}

function ForcastCardListing(props: IForecastingCardListingData) {
    const { todaysForecastingData, className = '' } = props;
    return (
        <div className={classNameMerger(styles.cityTodayForcast, className)}>
            <p>Today{"'"}s Forcast</p>
            <Row className={styles.ListWrapper}>
                {todaysForecastingData?.map((item) => (
                    <Col className={styles.item} lg={4} key={item.time}>
                        <p>{item.time}</p>
                        Icon
                        <h5 className="tempatureLabel">{item?.temp}</h5>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default ForcastCardListing;
