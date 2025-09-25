import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// For physical device testing, use your computer's IP address
// const API_BASE_URL = 'http://192.168.1.100:3001/api';

const API_BASE_URL = 'http://172.20.10.3:3001/api';

// For emulator/simulator
// const API_BASE_URL = 'http://localhost:3001/api';

// For Expo Go on physical device
// const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // Add timeout to prevent hanging requests
});

// Add token to requests
api.interceptors.request.use(
    async (config) => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error('Error getting token from storage:', error);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

// Auth API calls
export const login = (email: string, password: string) => {
    return api.post('/auth/login', { email, password });
};

export const signup = (email: string, password: string) => {
    return api.post('/auth/signup', { email, password });
};

// Notes API calls
export const getNotes = () => {
    return api.get('/notes');
};

export const getNote = (id: number) => {
    return api.get(`/notes/${id}`);
};

export const createNote = (title: string, content: string) => {
    return api.post('/notes', { title, content });
};

export const updateNote = (id: number, title: string, content: string) => {
    return api.put(`/notes/${id}`, { title, content });
};

export const deleteNote = (id: number) => {
    return api.delete(`/notes/${id}`);
};

export default api;