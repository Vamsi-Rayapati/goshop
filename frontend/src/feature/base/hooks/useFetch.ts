import axios, { AxiosRequestConfig, Canceler, type AxiosResponse as Response } from 'axios';
import { useCallback, useRef, useState } from 'react';
import apiService from '../utils/ApiService';

export interface IResponse<T> {
    data: T;
    isFailed: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    message?: string;
    statusCode?: number;
}


const useFetch = <T>(): [IResponse<T>, (config: AxiosRequestConfig)=> void] => {
    const [ response, setResponse ] = useState<IResponse<T>>({
        data: {} as T,
        isLoading: false,
        isSuccess: false,
        isFailed: false
    });
    
    const sendRequest = useCallback(async(config: AxiosRequestConfig) => {
        setResponse((prevResponse: IResponse<T>) => {
            return {
                ...prevResponse,
                isLoading: true,
                isSuccess: false,
                isFailed: false
            };
        });
        
        try {
            const res = await apiService.request<T>(config);
            console.log(res)
            setResponse({
                ...response,
                data: res.data,
                statusCode: res.status,
                isSuccess: true,
                isLoading: false
            });
        } catch(err:any) {
            setResponse({
                ...response,
                data: err.data,
                message: err.reason,
                statusCode: err.status,
                isFailed: true,
                isLoading: false
            });

        }
    }, [ response ]);

    return [ response, sendRequest ];
};

export default useFetch;
