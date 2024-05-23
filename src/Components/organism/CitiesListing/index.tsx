'use client';
import ForcastCardListing from '@/src/Components/atoms/ForcastCardListing';
import ForcastCityOverview from '@/src/Components/atoms/ForcastCityOverview';
import ForcastDaysListing from '@/src/Components/atoms/ForcastDaysListing';
import ProgressBar from '@/src/Components/atoms/ProgressBar';
import dataJson from '@/src/Data/CityList.json';
import { WeatherApiManager } from '@/src/Libs/ApiManager/Service/WeatherApiManager';
import { AppRoutes } from '@/src/Libs/Contants/Routes';
import { SearchCountryContext } from '@/src/Libs/Context/SearchCountry';
import { classNameMerger } from '@/src/Libs/Utils/Common';
import {
    foreCastdaysList,
    getFormattedTodaysForeCastData,
} from '@/src/Libs/Utils/Mapper';
import { ICityList } from '@/src/types/interface/common';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useMemo, useState } from 'react';
import styles from './index.module.scss';

function CitiesListing() {
    const [selectedCity, setSelectedCity] = useState<ICityList>();
    const [cityList, setCityList] = useState<ICityList[]>([]);
    const { setSelectedCountry } = useContext(SearchCountryContext);
    const router = useRouter();
    const fetchWeatherApi = async ({
        lat,
        long,
    }: {
        lat: string[];
        long: string[];
    }) => {
        const createPayload = {
            latitude: lat,
            longitude: long,
            timezone: 'Asia/Kolkata',
            hourly: ['temperature_2m', 'weather_code'].join(','),
            daily: [
                'temperature_2m_max',
                'temperature_2m_min',
                'weather_code',
            ].join(','),
            current: ['temperature_2m'],
            forecast_days: 3,
        };
        const res = await new WeatherApiManager().fetchWeatherApi(
            createPayload
        );
        return res.data;
    };

    const initialiser = async () => {
        const lats: string[] = [],
            longs: string[] = [];
        dataJson.cityList.forEach((item) => {
            lats.push(item.lat);
            longs.push(item.long);
        });
        const res = await fetchWeatherApi({
            lat: lats,
            long: longs,
        });
        const newList = dataJson.cityList?.map((item, index) => {
            return {
                ...item,
                weatherData: res[index],
            };
        });
        setSelectedCity(newList[0]);
        setCityList(newList);
    };

    useEffect(() => {
        initialiser();
    }, []);

    const forcastDaysData = useMemo(() => {
        if (selectedCity) {
            const itemData = foreCastdaysList(selectedCity?.weatherData?.daily);
            return itemData;
        }
    }, [selectedCity]);

    const forecastTodaysData = useMemo(() => {
        if (selectedCity) {
            const formattedData = getFormattedTodaysForeCastData(
                selectedCity?.weatherData?.hourly
            );
            return formattedData;
        }
    }, [selectedCity]);

    const handleRedirectToWeatherPage = (item: any) => {
        setSelectedCountry({
            lat: item?.lat,
            long: item?.long,
            name: item.name,
        });
        router.push(AppRoutes.WEATHER);
    };

    console.log(selectedCity, forecastTodaysData, 'here');
    return (
        <div className={classNameMerger(styles.listingWrapper)}>
            {cityList?.length === 0 ? <ProgressBar show /> : <></>}
            <section className={styles.List}>
                <ul>
                    {cityList?.map((item) => (
                        <li
                            className={
                                selectedCity?.id === item?.id
                                    ? styles.active
                                    : ''
                            }
                            key={`${item.lat} ${item.long}`}
                            onClick={() => {
                                setSelectedCity(item);
                            }}
                        >
                            <div className={styles.iconTimeName}>
                                <div className={styles.icon}></div>
                                <div className={styles.nameTime}>
                                    <h3>{item.name}</h3>
                                    {selectedCity?.id === item?.id && (
                                        <span
                                            onClick={() => {
                                                handleRedirectToWeatherPage(
                                                    item
                                                );
                                            }}
                                        >
                                            More
                                        </span>
                                    )}
                                    <p>
                                        {
                                            item?.weatherData?.current?.time.split(
                                                'T'
                                            )[1]
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className={`${styles.temp} tempatureLabel`}>
                                {item?.weatherData?.current?.temperature_2m}
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
            <section className={styles.cityOverViewSection}>
                <ForcastCityOverview
                    name={selectedCity?.name}
                    temp={selectedCity?.weatherData?.current?.temperature_2m}
                />
                <ForcastCardListing
                    todaysForecastingData={forecastTodaysData}
                />
                <ForcastDaysListing forcastDaysData={forcastDaysData} />
            </section>
        </div>
    );
}

export default CitiesListing;
