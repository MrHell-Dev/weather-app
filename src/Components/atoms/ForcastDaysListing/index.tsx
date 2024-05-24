import WeatherImage from '@/src/Components/atoms/WeatherImage';
import { WeatherLabelBasedOnCode } from '@/src/Libs/Contants/Constant';
import { classNameMerger } from '@/src/Libs/Utils/Common';
import { dateFormat, dateParse } from '@/src/Libs/Utils/dayUtils';
import { Col, Row } from 'react-bootstrap';
import styles from './index.module.scss';

interface IForcastDaysListing {
    className?: string;
    forcastDaysData: {
        date: string;
        temp_max: number;
        temp_min: number;
        code: number;
    }[];
}
function ForcastDaysListing(props: IForcastDaysListing) {
    const { forcastDaysData, className = '' } = props;
    const currentDate = dateFormat({
        date: new Date(),
        desiredFormat: 'yyyy-MM-dd',
    });
    return (
        <div className={classNameMerger(styles.citythreeDayForcast, className)}>
            <p>{forcastDaysData?.length}-Day Forcast</p>
            <div className={styles.ListWrapper}>
                {forcastDaysData?.map((item) => (
                    <Row key={item.date} className={styles.item}>
                        <Col lg={3}>
                            <p>
                                {item.date === currentDate
                                    ? 'Today'
                                    : dateFormat({
                                          date: dateParse({
                                              date: item?.date,
                                              format: 'yyyy-MM-dd',
                                          }),
                                          desiredFormat: 'iii',
                                      })}
                            </p>
                        </Col>
                        <Col className={styles.weatherIconContainer} lg={3}>
                            <div className="position-relative">
                                <WeatherImage weatherCode={item?.code} />
                            </div>
                            <p>{WeatherLabelBasedOnCode[item?.code]}</p>
                        </Col>
                        <Col lg={3}>
                            <p>
                                {item?.temp_max}/{item?.temp_min}
                            </p>
                        </Col>
                    </Row>
                ))}
            </div>
        </div>
    );
}

export default ForcastDaysListing;
