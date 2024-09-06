import axios, { Axios, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

class ApiService  {
   instance: AxiosInstance
   constructor() {
    this.instance = axios.create({})
   }

   async request<T = any, R = AxiosResponse<T, any>, D = any>(config: AxiosRequestConfig<D>): Promise<R> {
      const newConfig ={
         headers:{
            'Content-Type': 'application/json'
         },
         ...config
      }
      try {
         // Make the request and return the response
         return await this.instance.request(newConfig);
      } catch (error) {
         // Handle and display the error
         if (axios.isAxiosError(error)) {
            // Handle Axios-specific errors
            console.error('Axios error:', error);
            // You can also access error.response if needed
         } else {
            // Handle non-Axios errors
            console.error('Error:', error);
         }
         // Optionally, rethrow the error if you want to propagate it
         throw error;
      }
   }
}

const apiService = new ApiService();
export default apiService;
