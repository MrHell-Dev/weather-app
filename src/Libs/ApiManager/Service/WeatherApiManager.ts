import { ApiEndpoints } from '@/src/Libs/ApiManager/Endpoints';
import { BaseApiManager } from '@/src/Libs/ApiManager/Service/Base';

export class WeatherApiManager extends BaseApiManager {
    constructor() {
        super();
    }

    public fetchWeatherApi(payload: object) {
        const url = new URL(
            ApiEndpoints.weather_api,
            process.env.NEXT_PUBLIC_WEATHER_API_PATH
        );
        Object.entries(payload).forEach(([key, value]) => {
            url.searchParams.append(key, value);
        });
        return this.axiosInstance.get(url.href);
    }
    public fetchCityDataApi(payload: object) {
        const url = new URL(
            ApiEndpoints.city_api,
            process.env.NEXT_PUBLIC_GEOCODING_API_PATH
        );
        Object.entries(payload).forEach(([key, value]) => {
            url.searchParams.append(key, value);
        });
        return this.axiosInstance.get(url.href);
    }
}
