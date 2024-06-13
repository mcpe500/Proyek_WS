import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { ENV } from "../config/environment";

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string, headers: AxiosRequestConfig["headers"] = {}) {
    this.axiosInstance = axios.create({
      baseURL,
      headers,
    });
  }

  async get<T>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response.data;
  }

  async post<T>(
    url: string,
    data?: any,
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(
    url: string,
    data?: any,
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data, config);
    return response.data;
  }

  async patch<T>(
    url: string,
    data?: any,
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    const response = await this.axiosInstance.patch<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url, config);
    return response.data;
  }
}

export const Apis = {
  API_NINJA_ApiService: new ApiService(
    "https://api.api-ninjas.com/v1/exercises",
    {
      "X-Api-Key": ENV.API_NINJAS_API_KEY,
    }
  ),
};
