import { classNameMerger } from '@/src/Libs/Utils/Common';
import { Col, Row } from 'react-bootstrap';
import styles from './index.module.scss';

interface IAirCondition {
    className?: string;
    itemList?: {
        iconName?: string;
        label?: string;
        value?: string;
    }[];
}

function AirConditions(props: IAirCondition) {
    const { className = '', itemList } = props;
    return (
        <div className={classNameMerger(styles.itemWrapper, className)}>
            <p className="mb-4">Air Conditions</p>
            <Row>
                {itemList?.map((item, index) => (
                    <Col key={`${item.label}${index}`} lg={6}>
                        {item?.iconName && <div>icon</div>}
                        <div>
                            <p>{item?.label}</p>
                            <h5>{item?.value}</h5>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default AirConditions;
