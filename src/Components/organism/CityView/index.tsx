'use client';
import AirConditions from '@/src/Components/atoms/AirConditions';
import ForcastCardListing from '@/src/Components/atoms/ForcastCardListing';
import ForcastCityOverview from '@/src/Components/atoms/ForcastCityOverview';
import ForcastDaysListing from '@/src/Components/atoms/ForcastDaysListing';
import { WeatherApiManager } from '@/src/Libs/ApiManager/Service/WeatherApiManager';
import { AppRoutes } from '@/src/Libs/Contants/Routes';
import { SearchCountryContext } from '@/src/Libs/Context/SearchCountry';
import {
    foreCastdaysList,
    getFormattedTodaysForeCastData,
} from '@/src/Libs/Utils/Mapper';
import { ICityList } from '@/src/types/interface/common';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useMemo, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import styles from './index.module.scss';

function CityView() {
    const [selectedCityData, setSelectedCityData] = useState<ICityList>();
    const router = useRouter();
    const { searchCountry } = useContext(SearchCountryContext);
    const initialiser = async () => {
        if (searchCountry) {
            const res = await new WeatherApiManager().fetchWeatherApi({
                latitude: searchCountry?.lat,
                longitude: searchCountry?.long,
                timezone: 'Asia/Kolkata',
                hourly: ['temperature_2m', 'weather_code'].join(','),
                daily: [
                    'temperature_2m_max',
                    'temperature_2m_min',
                    'weather_code',
                    'uv_index_max',
                ].join(','),
                current: ['temperature_2m', 'wind_speed_10m', 'rain'].join(','),
            });
            if (res?.status) {
                setSelectedCityData({
                    name: searchCountry?.name,
                    lat: searchCountry?.lat,
                    long: searchCountry?.long,
                    weatherData: res?.data,
                });
            }
        } else {
            router.push(AppRoutes.CITIES);
        }
    };

    const forcastDaysData = useMemo(() => {
        if (selectedCityData) {
            const itemData = foreCastdaysList(
                selectedCityData?.weatherData?.daily
            );
            return itemData;
        }
    }, [selectedCityData]);

    const forecastTodaysData = useMemo(() => {
        if (selectedCityData) {
            const formattedData = getFormattedTodaysForeCastData(
                selectedCityData?.weatherData?.hourly
            );
            return formattedData;
        }
    }, [selectedCityData]);

    const airCondtionData = useMemo(() => {
        if (selectedCityData) {
            const itemData = [
                {
                    label: 'Real Feals',
                    value: selectedCityData?.weatherData?.current
                        ?.temperature_2m,
                },
                {
                    label: 'Wind',
                    value: selectedCityData?.weatherData?.current
                        ?.wind_speed_10m,
                },
                {
                    label: 'Chance of Rain',
                    value: selectedCityData?.weatherData?.current?.rain,
                },
                {
                    label: 'UV index',
                    value: selectedCityData?.weatherData?.daily
                        ?.uv_index_max[0],
                },
            ];

            return itemData;
        }
    }, [selectedCityData]);

    console.log(selectedCityData, 'here');
    useEffect(() => {
        initialiser();
    }, []);

    return (
        <Row>
            <Col lg={7} className="me-4">
                <Row>
                    <Col lg={12}>
                        <ForcastCityOverview
                            name={selectedCityData?.name}
                            temp={
                                selectedCityData?.weatherData?.current
                                    ?.temperature_2m
                            }
                        />
                    </Col>
                    <Col lg={12}>
                        <ForcastCardListing
                            className={styles.backgroundWrapper}
                            todaysForecastingData={forecastTodaysData}
                        />
                    </Col>
                    <Col lg={12}>
                        <AirConditions
                            itemList={airCondtionData}
                            className={styles.backgroundWrapper}
                        />
                    </Col>
                </Row>
            </Col>
            <Col lg={4}>
                <ForcastDaysListing
                    // className={styles.backgroundWrapper}
                    forcastDaysData={forcastDaysData}
                />
            </Col>
        </Row>
    );
}

export default CityView;
