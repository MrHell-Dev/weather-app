export interface IPageProps {
    searchParams?: string | string[];
    params?: string | string[];
}

export interface ICityList {
    name: string;
    long: string;
    lat: string;
    id?: string;
    time?: string;
    weatherData?: any;
}
