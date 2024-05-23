import { dateFormat, dateParse } from '@/src/Libs/Utils/dayUtils';
import { addHours } from 'date-fns';

export const getFormattedTodaysForeCastData = (itemData: any) => {
    const currentFormattedDate = dateFormat({
        date: new Date(),
        desiredFormat: 'yyyy-MM-dd',
    });

    let currentHour = dateFormat({
        date: addHours(new Date(), 3),
        desiredFormat: "HH:'00'",
    });
    const filteredData: any = [];
    itemData?.time.forEach((item: string, index: number) => {
        if (item.startsWith(currentFormattedDate)) {
            const itemTime = item.split('T')[1];
            if (itemTime === currentHour) {
                const parsedDate = dateParse({
                    date: itemTime,
                    format: 'HH:mm',
                });
                filteredData.push({
                    time: dateFormat({
                        date: parsedDate,
                        desiredFormat: 'hh:mm aa',
                    }),
                    temp: itemData?.temperature_2m[index],
                    code: itemData?.weather_code[index],
                });
                currentHour = dateFormat({
                    date: addHours(parsedDate, 3),
                    desiredFormat: "HH:'00'",
                });
            }
        }
    });
    return filteredData;
};

export const foreCastdaysList = (itemData: any) => {
    return itemData.time.map((item: string, index: number) => ({
        date: item,
        temp_max: itemData?.temperature_2m_max[index],
        temp_min: itemData?.temperature_2m_min[index],
    }));
};
