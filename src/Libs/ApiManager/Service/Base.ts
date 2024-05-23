import axios, { AxiosInstance } from 'axios';

export class BaseApiManager {
    protected axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create();
    }
}
