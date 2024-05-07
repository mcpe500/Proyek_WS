import axios, { Axios } from "axios";

class ApiService {
  private axiosInstance: Axios;
  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL: baseURL,
    });
  }
  async get<T>(url: string, headers = {}): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, { headers });
    return response.data;
  }

  async fetch<T>(url: string, headers = {}): Promise<T> {
    const response = await fetch(url, { headers });
    return response.json();
  }
  async fetchImage<T>(url: string, headers = {}): Promise<T> {
    const response = await fetch(url, { headers });
    if (response.headers.get("Content-Type")?.startsWith("image")) {
      return response.blob() as Promise<T>;
    }
    return response.json() as Promise<T>;
  }

  async query<T>(url: string, payload: any, headers = {}): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, payload, {
      headers,
    });
    return response.data;
  }

  async post<T>(url: string, data = {}, headers = {}): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, { headers });
    return response.data;
  }

  async put<T>(url: string, data: any, headers = {}): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data, { headers });
    return response.data;
  }

  async patch<T>(url: string, data: any, headers = {}): Promise<T> {
    const response = await this.axiosInstance.patch<T>(url, data, { headers });
    return response.data;
  }

  async delete<T>(url: string, headers = {}): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url, { headers });
    return response.data;
  }
}

export const Apis = {
  API_NINJA_ApiService: new ApiService(
    "https://api.api-ninjas.com/v1/exercises"
  ),
};
