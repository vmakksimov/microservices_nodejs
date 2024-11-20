"use client";
import axios from 'axios';
import dataProviderSimpleRest from "@refinedev/simple-rest";

const API_URL = "http://ticketing.site/api/users";
const AUTH_SERV = 'http://auth-srv:3000'
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// export const apiClient = axios.create({
//   baseURL: AUTH_SERV,
//   withCredentials: true,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

// Custom error handler
axiosInstance.interceptors.response.use(
  (config) => {
    console.log('Request:', config);
    return config;
},
(error) => {
    console.log('Request Error:', error);
    return Promise.reject(error);
}
);

axiosInstance.interceptors.response.use(
  (response) => {
      console.log('Response:', response);
      return response;
  },
  (error) => {
      console.log('Response Error:', error.response?.data);
      // Transform the error to match what refine expects
      const customError = {
          ...error,
          message: error.response?.data?.errors?.[0]?.message || 'An error occurred',
          statusCode: error.response?.status
      };
      return Promise.reject(customError);
  }
);

export const dataProvider = dataProviderSimpleRest(API_URL, axiosInstance);

// const httpClient = axios.create({
//     baseURL: API_URL,
//   });
//   console.log('here in httpclient')
// export const dataProvider = dataProviderSimpleRest(API_URL, httpClient);
