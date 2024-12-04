import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,  // adjust to your Laravel backend URL
    headers: {
        'Content-Type': 'application/json'
    }
});

export const siteService = {
    getSites: async () => {
        try {
            const response = await api.get('/construction-sites');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getSite: async (id) => {
        try {
            const response = await api.get(`/construction-sites/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    createSite: async (siteData) => {
        try {
            const response = await api.post('/construction-sites', siteData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    updateSite: async (id, siteData) => {
        try {
            const response = await api.put(`/construction-sites/${id}`, siteData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    deleteSite: async (id) => {
        try {
            const response = await api.delete(`/construction-sites/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getUsers: async (id) => {
        try {
            const response = await api.get(`/construction-sites/get-users/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};