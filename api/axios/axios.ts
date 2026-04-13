import axios from "axios";
import https from 'https';


export const baseURL = "https://fakestoreapi.com";

export const AxiosInstance = axios.create({
  baseURL: baseURL,

  httpsAgent: new https.Agent({  
    rejectUnauthorized: false
  }),
});

