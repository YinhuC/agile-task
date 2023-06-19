import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`;
export const axiosClient = axios.create({ baseURL: API_URL });
