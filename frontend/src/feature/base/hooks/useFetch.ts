import axios, { AxiosRequestConfig, Canceler, type AxiosResponse as Response } from 'axios';
import { useCallback, useRef, useState } from 'react';
import apiService from '../utils/ApiService';
import { message } from 'antd';

export interface IResponse<T> {
    data: T;
    isFailed: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    message?: string;
    statusCode?: number;
}


function useFetch<T>(): [IResponse<T>, (config: AxiosRequestConfig)=> Promise<IResponse<T>>] {
    const [ response, setResponse ] = useState<IResponse<T>>({
        data: {} as T,
        isLoading: false,
        isSuccess: false,
        isFailed: false
    });
    
    const sendRequest = useCallback(async(config: AxiosRequestConfig) :Promise<IResponse<T>> => {
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
            const newResponse = {
                ...response,
                data: res.data,
                statusCode: res.status,
                isSuccess: true,
                isLoading: false
            }
            setResponse(newResponse);
            return newResponse;
        } catch(error:any) {
            const data = error.response.data;
            message.error(data.message ?? "Something went wrong")
            const newResponse = {
                ...response,
                data: data,
                message: data.message,
                statusCode: error.status,
                isFailed: true,
                isLoading: false
            }
            setResponse(newResponse);
            return newResponse;
        }
    }, [ response ]);

    return [ response, sendRequest ];
};

export default useFetch;
