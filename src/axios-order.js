import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://react-my-burger-d0c0a.firebaseio.com/'
});

export default axiosInstance;