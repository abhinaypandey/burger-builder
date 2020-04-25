import axios from 'axios';

const axiosInstance = axios.create({
    baseURL : 'https://burger-builder-d38a6.firebaseio.com'
});

export default axiosInstance ;